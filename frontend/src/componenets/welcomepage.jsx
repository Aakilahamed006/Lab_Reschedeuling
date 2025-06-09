import React from 'react';
import { useNavigate } from "react-router-dom";
import './WelcomePage.css';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      <h1 className="welcome-title">University of Jaffna</h1>
      <h2 className="welcome-subtitle">Welcome to the Lab Rescheduling System</h2>

      <div className="welcome-buttons">
      <button className="welcome-button" onClick={() => navigate('/student-login')}>Student</button>
      <button className="welcome-button" onClick={() => navigate('/coordinator-login')}>Coordinator</button>
      <button className="welcome-button" onClick={() => navigate('/instructor-login')}>Instructor</button>
      </div>
      <p className="welcome-text">
        This system allows students to request lab rescheduling, instructors to manage their availability, and coordinators to oversee the entire process.
      </p>
    </div>
  );
}

export default WelcomePage;
