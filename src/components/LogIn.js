import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Alert from "./Alert";
import NoteContext from "../context/notes/NoteContext"; // ✅ Your context path

const LogIn = () => {
  const context = useContext(NoteContext);
  const { getToken } = context; // ✅ using context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  const handleChangeMail = (e) => setEmail(e.target.value);
  const handleChangePass = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`https://inotebook-v6zu.onrender.com/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (json.success || json.authToken) {
        // ✅ Store token using localStorage
        localStorage.setItem("token", json.authToken);

        // ✅ Optionally validate with getToken() (example usage)
        const token = getToken();
        if (token) {
          setAlert({ type: "success", message: "Login successful!" });

          // ✅ Redirect to home without page reload
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          setAlert({ type: "danger", message: "Failed to store token" });
        }
      } else {
        setAlert({ type: "danger", message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Login failed:", error);
      setAlert({ type: "danger", message: "An error occurred during login" });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div style={{ width: "100%", maxWidth: "400px" }}>
        {/* 🔔 Show alert if available */}
        {alert && <Alert type={alert.type} message={alert.message} />}

        <div className="card p-4 shadow">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="loginEmail" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="loginEmail"
                placeholder="Enter email"
                onChange={handleChangeMail}
                value={email}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="loginPassword" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="loginPassword"
                placeholder="Enter password"
                onChange={handleChangePass}
                value={password}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          <p className="mt-3 text-center">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;