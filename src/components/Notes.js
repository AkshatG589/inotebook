// File: src/components/Notes.js
import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItems from "./NoteItems"
function Notes() {
  const context = useContext(NoteContext); 
  const { notes } = context;

  return (    
    <div className="container my-2 bg-light p-2 border rounded ">
      <h1 className="text-center">Your Notes</h1>
      {Array.isArray(notes) && notes.map((note, index) => (
        <NoteItems note={note} key={index}/>
      ))}
    </div>
  );
}

export default Notes;