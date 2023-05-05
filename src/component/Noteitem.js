import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const { note , updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa fa-pencil-square-o mx-2" onClick={()=> {updateNote(note)}}aria-hidden="true"></i>       
                        <i className="fa fa-trash-o mx-2" aria-hidden="true" onClick={()=>{deleteNote(note._id);
                        props.showAlert("Deleted sucessfully", "success");}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
