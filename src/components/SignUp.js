import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    setShowWarning(
      formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword
    );
  }, [formData.password, formData.confirmPassword]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword)
    {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const json = await response.json();

      if (json.success || json.authToken) {
        // Save token if required
        localStorage.setItem("token", json.authToken);
        //alert("Submitted successfully!");
        navigate("/"); // Redirect to home
        window.location.reload();
      } else {
        alert("Signup failed. Try again.");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Something went wrong during signup.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              minLength={3}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              minLength={5}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm password"
              minLength={5}
              onChange={onChange}
              required
            />
          </div>

          {showWarning && (
            <div className="position-relative d-inline-block mt-2">
              <div
                className="popover bs-popover-end show position-absolute top-0 start-100 translate-middle-y ms-2"
                role="tooltip"
                style={{ width: "280px" }}
              >
                <h3 className="popover-header bg-warning">Warning!</h3>
                <div className="popover-body">
                  Password and Confirm Password must be the same.
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="btn btn-success w-100 mt-3">Sign Up</button>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;