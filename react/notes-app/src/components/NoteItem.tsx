import * as React from "react";
import Note from "./Note";

interface INotesItemProps {
    note: Note;
}

export default class NoteItem extends React.Component<INotesItemProps, Note> {

    constructor(props: INotesItemProps) {
        super(props);
        this.state = props.note;
    }

    render(): JSX.Element {
        return (
            <div
                className={`col-6 alert  ${this.state.highPriority ? 'alert-warning' : 'alert-success'}`}>
                <span>#{this.state.id}</span>
                <div>{this.state.text}</div>
            </div>
        );
    }
}