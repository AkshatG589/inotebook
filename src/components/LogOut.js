import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert"; // ✅ Import your Alert component

export default function LogOut() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null); // ✅ Alert state

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAlert({ type: "success", message: "Logout successful!" });

    // ⏳ Redirect after short delay
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <>
      {/* ✅ Alert shown here */}
      {alert && <Alert type={alert.type} message={alert.message} />}

      <button onClick={handleLogout} className="btn btn-outline-danger w-100">
        Logout
      </button>
    </>
  );
}