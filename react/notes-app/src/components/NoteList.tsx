import * as React from "react";

import NoteItem from './NoteItem'
import Note from "./Note";

interface INoteListProps {
    notes?: Array<Note>
}

interface INoteListState {
    newNoteText: string;
    notes?: Array<Note>
}

export default class NoteList extends React.Component<INoteListProps, INoteListState> {

    constructor(props: INoteListProps) {
        super(props);
        this.state = {newNoteText: '', notes: props.notes};
    }

    changePriority(id: number): void {
        const notes = this.state.notes || [];
        let noteToChange = notes.find(n => n.id === id);
        if (noteToChange)
            noteToChange.highPriority = !noteToChange.highPriority;
        this.setState({notes});
    }

    addNote(): void {
        const notes = this.state.notes || [];
        notes.push(new Note(notes.length + 1, this.state.newNoteText, true))
        this.setState({notes});
    }

    deleteNote(id: number): void {
        const notes = this.props.notes || [];
        let noteToDel = notes.find(n => n.id === id);
        if (noteToDel)
            notes.splice(notes.indexOf(noteToDel), 1);
        this.setState({notes});
    }

    updateInputValue(evt: React.FormEvent<HTMLTextAreaElement>) {
        this.setState({
            newNoteText: evt.currentTarget.value
        });
    }

    render(): JSX.Element {
        const notes = this.state.notes || [];
        return (
            <div className="container col-8">
                <div className="mt-5">
                    {notes.length > 0 &&
                    notes.map(note =>
                        <div className='d-flex flex-row justify-content-start' key={note.id}>
                            <NoteItem note={note}/>
                            <div>
                                <button className='btn btn-outline-primary'
                                        onClick={() => this.changePriority(note.id)}>Change priority
                                </button>
                                <button className='btn btn-outline-warning'
                                        onClick={() => this.deleteNote(note.id)}>Delete note
                                </button>
                            </div>
                        </div>
                    )}
                    {notes.length < 1 && <div className='alert alert-danger col-8'>No notes!</div>}
                </div>
                <div className="d-flex flex-column ">
                    <textarea className='col-8'
                        value={this.state.newNoteText}
                        onChange={(evt: React.FormEvent<HTMLTextAreaElement>) => this.updateInputValue(evt)}/>
                    <button className='btn btn-success col-2' onClick={() => this.addNote()}>Create Note</button>
                </div>
            </div>
        );
    }
}