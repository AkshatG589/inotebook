import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import UpdateNote from "./updateNote"
const NoteItems = ({ note }) => {
  const context = useContext(NoteContext);
  const { deleteNote , updateNote } = context;
  return (
    <div className="card my-2">
  <div className="card-body position-relative">
    {/* Action buttons in top-right corner */}
    <div className="position-absolute top-0 end-0 m-2">
      <UpdateNote note={note} updateNote={updateNote} />
      <button className="btn btn-sm btn-outline-danger" title="Delete" onClick={()=>{deleteNote(note._id)}}>
        <i className="bi bi-trash"></i>
      </button>
    </div>

    {/* Main content */}
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text" style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>

    {note.tag && (
      <div className="d-flex flex-wrap gap-1 mt-2">
        {note.tag.split(",").map((tag, i) => (
          <span className="badge bg-primary me-1" key={i}>
            {tag}
          </span>
        ))}
      </div>
    )}
  </div>
</div>
  );
};

export default NoteItems;