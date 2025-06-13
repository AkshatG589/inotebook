import React, { useState, useEffect } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "https://inotebook-v6zu.onrender.com";
  const [notes, setNotes] = useState([]);

  // 🔑 Get token from localStorage
  const getToken = () => localStorage.getItem("token");

  // ✅ Fetch all notes
  const getNotes = async () => {
  try {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': getToken(),
      },
    });

    const json = await response.json();
    console.log("Fetched notes:", json); // For debugging

    // ✅ Safely handle response
    if (Array.isArray(json)) {
      setNotes(json);
    } else if (Array.isArray(json.notes)) {
      setNotes(json.notes);
    } else {
      console.error("Invalid notes format from backend:", json);
      setNotes([]); // fallback to empty array
    }
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Add Note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": getToken(),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const newNote = await response.json();
      setNotes((prevNotes) => prevNotes.concat(newNote));
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // ✅ Delete Note
  const deleteNote = async (id) => {
    try {
      await fetch(`${host}/api/notes/deletenotes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": getToken(),
        },
      });

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // ✅ Update Note
  const updateNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": getToken(),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const updatedNote = await response.json();

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? updatedNote : note
        )
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNotes , getToken }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;