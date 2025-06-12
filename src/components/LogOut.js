import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logout successful!");
    navigate("/login");
    window.location.reload();  //not recommended
  };
  return (
    <button onClick={handleLogout} className="btn btn-outline-danger w-100">
      Logout
    </button>
  );
}