import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";      // ✅ Your loader
import Alert from "./Alert";          // ✅ Your alert component

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null); // ✅ Alert message state

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
        localStorage.setItem("token", json.authToken);

        // ✅ Show success alert
        setAlert({ type: "success", message: "Login successful!" });

        // Redirect after short delay
        setTimeout(() => {
          navigate("/");
          window.location.reload(); // optional
        }, 1000);
      } else {
        // ❌ Show error alert
        setAlert({ type: "danger", message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Login failed:", error);
      setAlert({ type: "danger", message: "An error occurred during login" });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading screen
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