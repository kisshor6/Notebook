import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"", description:"", tag:""})

    const handleClick = (e)=>{
        addNote(note.title, note.description, note.tag);
        props.showAlert("Added sucessfully", "success");
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className='container my-3'>
            <h1>Add a Note</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title"name="title" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description"  className="form-label">description</label>
                    <input type="text" className="form-control" name="description" id="description" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag"  className="form-label">tag</label>
                    <input type="text" className="form-control" name="tag" id="tag" onChange={onChange} minLength={5} required/>
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add notes</button>
            </form>
        </div>
    )
}

export default AddNote;
