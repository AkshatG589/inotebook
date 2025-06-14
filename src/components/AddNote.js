import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";
import Alert from "./Alert";
import "./Mobile.css";

const AddNote = () => {
  const navigate = useNavigate();
  const { addNote, getToken } = useContext(NoteContext);

  const [note, setNote] = useState({ title: "", description: "" });
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [alert, setAlert] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      setAlert({ type: "warning", message: "Please login to add a note." });
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    const finalTags = tags.join(", "); // space after comma for readability

    try {
      addNote(note.title, note.description, finalTags);
      setAlert({ type: "success", message: "Note added successfully!" });

      // Reset fields
      setNote({ title: "", description: "" });
      setTagInput("");
      setTags([]);
    } catch (error) {
      console.error("Add note failed:", error);
      setAlert({ type: "danger", message: "Failed to add note. Try again." });
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleAddTag = () => {
    const rawTags = tagInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const uniqueNewTags = rawTags.filter((tag) => !tags.includes(tag));
    if (uniqueNewTags.length > 0) {
      setTags((prevTags) => [...prevTags, ...uniqueNewTags]);
    }
    setTagInput("");
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="container bg-light my-3 border p-3 rounded">
      {/* 🔔 Alert Display */}
      {alert && <Alert type={alert.type} message={alert.message} />}

      <h1 className="text-center">Add Note</h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter title"
            onChange={onChange}
            value={note.title}
            minLength={3}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            placeholder="Enter description"
            onChange={onChange}
            value={note.description}
            minLength={5}
            required
          ></textarea>
        </div>

        {/* Tags */}
        <div className="mb-3">
          <label htmlFor="tagInput" className="form-label">Tags</label>
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              id="tagInput"
              name="tag"
              placeholder="Enter tag(s)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-outline-primary w-25 w-sm-50"
              onClick={handleAddTag}
            >
              Add Tag
            </button>
          </div>

          {/* Tag badges */}
          <div className="mt-3 d-flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span className="badge bg-primary d-inline-flex align-items-center" key={index}>
                {tag}
                <button
                  type="button"
                  className="btn-close btn-close-white btn-sm ms-2"
                  aria-label="Remove"
                  onClick={() => removeTag(index)}
                ></button>
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-2">Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;