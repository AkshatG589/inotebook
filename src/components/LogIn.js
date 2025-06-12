import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const LogIn = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  const handleChangeMail = (e) => setEmail(e.target.value);
  const handleChangePass = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        // Save token to localStorage if needed
        localStorage.setItem("token", json.authToken);
        
        alert("Login successful!");
        navigate("/"); // Redirect to home
        window.location.reload();  //not recommended
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
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
  );
};

export default LogIn;