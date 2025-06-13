import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa"; // Icons from react-icons
import { SiLeetcode } from "react-icons/si";

export default function About() {
  return (
    <div className="container my-4 p-4 bg-light rounded border shadow-sm">
      <h1 className="text-center text-primary mb-4">About iNotebook</h1>

      <p>
        <strong>iNotebook</strong> is a simple and secure note-taking web application built to help you organize your thoughts, tasks, and important information in one place.
        With a focus on <strong>privacy</strong>, <strong>ease of use</strong>, and <strong>speed</strong>, iNotebook lets you access your notes from anywhere with an internet connection.
      </p>

      <h4 className="mt-4 text-secondary">✨ Key Features:</h4>
      <ul>
        <li><strong>User Authentication:</strong> Secure login and signup using JWT-based authentication.</li>
        <li><strong>Note Management:</strong> Create, edit, and delete your personal notes with ease.</li>
        <li><strong>Instant Access:</strong> Your notes are loaded instantly after login with a clean interface.</li>
        <li><strong>Responsive Design:</strong> Works perfectly across mobile, tablet, and desktop devices.</li>
      </ul>

      <h4 className="mt-4 text-secondary">🔧 Technologies Used:</h4>
      <ul>
        <li><strong>Frontend:</strong> React, Bootstrap, React Router</li>
        <li><strong>Backend:</strong> Node.js, Express.js</li>
        <li><strong>Database:</strong> MongoDB Atlas (cloud-hosted)</li>
        <li><strong>Authentication:</strong> JSON Web Token (JWT)</li>
      </ul>

      <p className="mt-4">
        Whether you're a student, professional, or just someone who loves staying organized, iNotebook is designed to make your life easier by keeping your notes accessible and secure.
      </p>

      <hr />
      <div className="text-center">
        <h5>Developed by <strong>Akshat Kumar Gupta</strong></h5>
        <p>Connect with me:</p>

        <div className="d-flex justify-content-center gap-3">
          <a
            href="https://www.linkedin.com/in/akshat-gupta1506?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary d-flex align-items-center gap-2"
          >
            <FaLinkedin size={20} /> 
          </a>

          <a
            href="https://github.com/AkshatG589/inotebook"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-dark d-flex align-items-center gap-2"
          >
            <FaGithub size={20} /> 
          </a>

          <a
            href="https://leetcode.com/u/akshatg_123/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-warning d-flex align-items-center gap-2"
          >
            <SiLeetcode size={20} /> 
          </a>
        </div>
      </div>
    </div>
  );
}