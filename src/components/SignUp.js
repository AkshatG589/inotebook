import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Alert from "./Alert";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showWarning, setShowWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  // Show warning if passwords mismatch
  useEffect(() => {
    setShowWarning(
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    );
  }, [formData.password, formData.confirmPassword]);

  // Auto-dismiss alert after 3 seconds
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://inotebook-v6zu.onrender.com/api/auth/createUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const json = await response.json();

      if (json.success || json.authToken) {
        localStorage.setItem("token", json.authToken);
        setAlert({ type: "success", message: "Signup successful!" });

        // Redirect after showing alert
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setAlert({
          type: "danger",
          message: json.error || "Signup failed. Try again.",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setAlert({
        type: "danger",
        message: "Something went wrong during signup.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div style={{ width: "100%", maxWidth: "400px" }}>
        {alert && <Alert type={alert.type} message={alert.message} />}

        <div className="card p-4 shadow">
          <h2 className="text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" onChange={onChange} required minLength={3} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" onChange={onChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" onChange={onChange} required minLength={5} />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="confirmPassword" onChange={onChange} required minLength={5} />
            </div>

            {showWarning && (
              <div className="alert alert-warning mt-2">
                Password and Confirm Password must be the same.
              </div>
            )}

            <button type="submit" className="btn btn-success w-100 mt-3">Sign Up</button>
          </form>
          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;