import * as React from "react";
import {Component} from "react";

interface IProps {
    className?: string,
    startValue?: string,
    getSuggestions(query: string, limit: number): Promise<string[]>;
    limit: number,
    delay?: number;
    minSearchLength?: number;
    onEnter(value: string): void,
    onChange(value: string): void;
}

interface IState {
    suggestions: string[],
    query: string,
    showSuggestions: boolean,
    activeSuggestion: number,
    delay: number;
    minSearchLength: number;
    typing: boolean,
    typingTimeout: any
}

interface IPropsItem {
    item: string,
    idx: number,
    activeIdx: number,
    onClick(): void
}

const SuggestionItem: React.FC<IPropsItem> = (props: IPropsItem) => (
    <li className='list-group-item list-group-item-action pt-0 pb-0 pl-3'
        onClick={() => props.onClick()}>
        <span className={(props.idx === props.activeIdx) ? 'font-weight-bolder' : 'font-italic'}> {props.item} </span>
    </li>
);

export class AutocompleteInput extends Component<IProps, IState> {

    private defaultDelay = 300;
    private defaultMinSearchLength = 2;

    constructor(props: IProps) {
        super(props);
        this.state = {
            suggestions: [],
            query: this.props.startValue || '',
            showSuggestions: false,
            activeSuggestion: -1,
            typing: false,
            typingTimeout: null,
            delay: this.props.delay || this.defaultDelay,
            minSearchLength: this.props.minSearchLength || this.defaultMinSearchLength
        };
    }

    onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        const lastActiveSuggestion = this.state.activeSuggestion
        const filteredSuggestions = this.state.suggestions;
        if (e.keyCode === 13) {
            let text = filteredSuggestions[lastActiveSuggestion];
            this.onEnterClick(text || this.state.query);
        } else if (e.keyCode === 38) {
            if (lastActiveSuggestion === 0) {
                return;
            }
            let val = filteredSuggestions[lastActiveSuggestion - 1];
            e.currentTarget.value = val;
            this.setState({query: val, activeSuggestion: lastActiveSuggestion - 1});
        } else if (e.keyCode === 40) {
            if (lastActiveSuggestion + 1 >= filteredSuggestions.length) {
                this.setState({activeSuggestion: filteredSuggestions.length - 1});
                return;
            }
            let val = filteredSuggestions[lastActiveSuggestion + 1];
            e.currentTarget.value = val;
            this.setState({query: val, activeSuggestion: lastActiveSuggestion + 1});
        }
    };

    sleep = (m: number) => new Promise(r => setTimeout(r, m))

    async onType(text: string) {
        await this.fillSuggestions(text);
        await this.sleep(this.state.delay);
    }

    async fillSuggestions(text: string) {
        this.setState({query: text, showSuggestions: true});
        this.props.onChange(text);
        if (text.length > this.state.minSearchLength) {
            let suggestions = await this.props.getSuggestions(text, this.props.limit);
            this.setState({
                suggestions: suggestions
            })
        }
    }

    onEnterClick(text: string) {
        this.setState({
            activeSuggestion: -1,
            showSuggestions: false,
            query: text
        });
        this.props.onEnter(text);
    }

    render() {
        return (
            <div>
                <input
                    className={this.props.className}
                    type="text"
                    onChange={(e) => this.onType(e.target.value)}
                    onKeyDown={(e) => this.onKeyDown(e)}
                    value={this.state.query}
                />
                {this.state.showSuggestions && this.state.suggestions?.length > 0 &&
                <ul className='list-group list-group-flush'>
                    {this.state.suggestions.map((item, idx) =>
                        <SuggestionItem onClick={() => this.onEnterClick(item)}
                                        idx={idx} item={item}
                                        activeIdx={this.state.activeSuggestion}
                                        key={idx}/>
                    )}
                </ul>
                }
            </div>
        );
    }
}

