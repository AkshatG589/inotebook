import React, { useState, useEffect } from "react";

const UpdateNote = ({ note, updateNote }) => {
  const [etitle, setETitle] = useState("");
  const [edescription, setEDescription] = useState("");
  const [etagInput, setETagInput] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (note) {
      setETitle(note.title);
      setEDescription(note.description);
      const tagList = note.tag
        ? note.tag.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0)
        : [];
      setTags(tagList);
    }
  }, [note]);

  const handleAddTag = () => {
    const newTags = etagInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0 && !tags.includes(tag));
    if (newTags.length > 0) {
      setTags((prev) => [...prev, ...newTags]);
    }
    setETagInput("");
  };

  const removeTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const handleUpdate = () => {
    const tagString = tags.join(", ");
    updateNote(note._id, etitle, edescription, tagString);
    const closeBtn = document.getElementById(`closeModalBtn-${note._id}`);
    if (closeBtn) closeBtn.click();
  };

  return (
    <>
      {/* Edit Button */}
      <button
        className="btn btn-sm btn-outline-primary me-1"
        data-bs-toggle="modal"
        data-bs-target={`#exampleModal-${note._id}`}
        title="Edit"
      >
        <i className="bi bi-pencil-square"></i>
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id={`exampleModal-${note._id}`}
        tabIndex="-1"
        aria-labelledby={`exampleModalLabel-${note._id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`exampleModalLabel-${note._id}`}>
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id={`closeModalBtn-${note._id}`}
              ></button>
            </div>

            <div className="modal-body">
              <form>
                {/* Title */}
                <div className="mb-3">
                  <label htmlFor={`etitle-${note._id}`} className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`etitle-${note._id}`}
                    value={etitle}
                    onChange={(e) => setETitle(e.target.value)}
                    minLength={3}
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label htmlFor={`edescription-${note._id}`} className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id={`edescription-${note._id}`}
                    rows="3"
                    value={edescription}
                    minLength={5}
                    required
                    onChange={(e) => setEDescription(e.target.value)}
                  ></textarea>
                </div>

                {/* Tags Input */}
                <div className="mb-3">
                  <label htmlFor={`etag-${note._id}`} className="form-label">Tags</label>
                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      id={`etag-${note._id}`}
                      value={etagInput}
                      onChange={(e) => setETagInput(e.target.value)}
                      placeholder="Enter tags"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary w-25 w-sm-50"
                      onClick={handleAddTag}
                    >
                      Add Tag
                    </button>
                  </div>

                  {/* Tag Badges */}
                  <div className="mt-2 d-flex flex-wrap">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="badge bg-primary d-inline-flex align-items-center me-2 mb-2"
                      >
                        {tag}
                        <button
                          type="button"
                          className="btn-close btn-close-white ms-2"
                          aria-label="Remove"
                          onClick={() => removeTag(tag)}
                          style={{ fontSize: "0.6rem" }}
                        ></button>
                      </span>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateNote;