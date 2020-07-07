import * as React from 'react'
import NoteList from './NoteList'
import Note from './Note'

const notesList = [
    new Note(1,  'Test note 1', false),
    new Note(2, 'Test note 2', true)
];

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <NoteList notes={ notesList }/>
            </div>
        );
    }
}

export default App;