import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import './TaskNote.css';

const TaskNote = ({note, onChange, onDelete}) => {

    const [desc, setDesc] = useState(note.note);
    const [changed, setChanged] = useState(false);

    /**
     * Method for changing the description of the note.
     * @param {Event} e The change event triggered
     */
    const onChangeBase = (e) => {
        note.note = e.target.value;
        setDesc(e.target.value);
    }
    return <div className="note-container">
        <textarea
            className="task-note"
            value={note.note}
            onChange={(e) => {
                onChangeBase(e);
                if (!changed) {
                    onChange(note);
                    setChanged(true);
                }
            }}
            maxLength={500}
            >

        </textarea>
        <MdDelete className="task-note-delete" size={25} onClick={() => {onDelete(note);}}/>
    </div>
}

export default TaskNote;