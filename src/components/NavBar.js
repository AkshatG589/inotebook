import React from "react";
import '../login.css';
import User from "./User"
import { Link,  useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation()
  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary ">
      <div className="text-start container-fluid">
        <Link className="navbar-brand text-primary" to="#"><b>iNotebook</b></Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
            </li>
          </ul>
          {/* login signup buttons*/}
          {localStorage.getItem("token") !== null ?
          <div>
            <User /> 
          </div>    
               :
          <div className="btn-group">
            <Link
              to="/login"
              className="btn btn-outline-secondary px-4 py-2 rounded-start">
                  Login
            </Link>
            <Link
              to="/signup"
              className="btn btn-outline-secondary px-4 py-2 rounded-end">
                  Signup
            </Link>
          </div>
          }
        </div>
      </div>
    </nav>
  );
}