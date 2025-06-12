import React, { useEffect, useState, useRef } from "react";
import { FaUserCircle, FaUser } from "react-icons/fa";
import LogOut from "./LogOut"; // Importing reusable logout component

export default function User() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });

        const data = await response.json();
        if (response.ok && (data.user || data.name)) {
          setUser(data.user || data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="btn btn-outline-secondary dropdown-toggle"
        type="button"
        onClick={() => setOpen(!open)}
        title="Profile"
        aria-label="User Profile"
      >
        <FaUser size={18} />
      </button>

      {open && (
        <div
          className="dropdown-menu show p-3 shadow rounded"
          style={{ minWidth: "250px", right: 0, left: "auto" }}
        >
          <div className="d-flex flex-column align-items-center mb-2">
            <FaUserCircle size={50} className="text-primary mb-2" />
            <p className="mb-1 fw-bold text-center">{user.name}</p>
            <p className="mb-2 text-muted small text-center">{user.email}</p>
          </div>
          <LogOut />
        </div>
      )}
    </div>
  );
}