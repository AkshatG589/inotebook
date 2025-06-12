import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
function About() {
  const a = useContext(NoteContext); 
  return (
    <div>
      This is about {a.notes[0].tag}
    </div>
  );
}

export default About;