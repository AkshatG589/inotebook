import React, { useState, useEffect } from "react"

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [data, setData] = useState({ users: [], notes: [] });
  const [openUserId, setOpenUserId] = useState(null);
  const [error, setError] = useState("");

  const correctPassword = "admin@123"; // Replace with env in production

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      setError("Incorrect password");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://inotebook-v6zu.onrender.com/api/admin/data", {
        headers: {
          "x-admin-secret": correctPassword,
        },
      });
      const json = await res.json();
      setData(json);
    };

    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  const toggleUserNotes = (userId) => {
    setOpenUserId((prevId) => (prevId === userId ? null : userId));
  };

  const renderTags = (tagString) => {
    if (!tagString) return null;
    return tagString.split(",").map((tag, index) => (
      <span key={index} className="badge bg-secondary me-1">
        {tag.trim()}
      </span>
    ));
  };

  if (!isAuthenticated) {
    return (
      <div className="container mt-5">
        <h2>🔒 Admin Login</h2>
        <input
          type="password"
          className="form-control my-2"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleLogin}>
          Submit
        </button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📊 Admin Panel</h2>

      <h3>👤 Users</h3>
      <div className="accordion" id="adminAccordion">
        {data.users.map((user) => {
          const isOpen = openUserId === user._id;
          const userNotes = data.notes.filter((note) => note.user === user._id);

          return (
            <div key={user._id} className="card mb-2 border-primary">
              <div
                className="card-header d-flex justify-content-between align-items-center bg-light border rounded"
                onClick={() => toggleUserNotes(user._id)}
                style={{ cursor: "pointer" }}
              >
                <div>
                  <strong>{user.name}</strong> <br />
                  <small className="text-muted">{user.email}</small>
                </div>
                <i
                  className={`bi ${
                    isOpen ? "bi-chevron-down" : "bi-chevron-right"
                  } fs-4 text-primary`}
                ></i>
              </div>

              {isOpen && (
                <div className="card-body bg-white">
                  <h6>📝 Notes:</h6>
                  {userNotes.length > 0 ? (
                    <ul className="list-group">
                      {userNotes.map((note) => (
                        <li key={note._id} className="list-group-item">
                          <strong>{note.title}</strong>
                          <p>{note.description}</p>
                          <div>{renderTags(note.tag)}</div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No notes found for this user.</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}