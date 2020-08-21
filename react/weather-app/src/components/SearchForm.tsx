import * as React from "react";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {findCities} from "../utils/apiTomtom";
import {AutocompleteInput} from "./AutocompleteInput";

interface IStateSearchWeatherForm {
    cityToSearch: string;
}

class SearchForm extends React.Component<RouteComponentProps, IStateSearchWeatherForm> {

    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {cityToSearch: ''};
        this.enterInputValue = this.enterInputValue.bind(this);
        this.changeInputValue = this.changeInputValue.bind(this);
    }

    changeInputValue(currCity: string): void {
        this.setState({cityToSearch: currCity});
    }

    enterInputValue(value: string) {
        this.setState({cityToSearch: value});
        this.props.history.push(`/city/${value}`);
    }

    render() {
        return (
            <div className='card'>
                <h6 className='card-header'>Print city and press Enter or button...</h6>
                <div className='card-body'>
                    <div className='form'>
                        <div className='d-flex '>
                            <div className="col-10 p-0">
                                <AutocompleteInput
                                    className='form-control'
                                    startValue=''
                                    getSuggestions={findCities}
                                    limit={5}
                                    onChange={(e) => this.changeInputValue(e)}
                                    onEnter={(e) => this.enterInputValue(e)}/>
                            </div>
                            <div className="col">
                                <Link
                                    className={`btn btn-outline-primary ${this.state.cityToSearch? '' : 'disabled'}`}
                                    role="button"
                                    to={this.state.cityToSearch ?  `/city/${this.state.cityToSearch}` : ""}>
                                        <i className="fas fa-cloud-sun"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SearchForm);