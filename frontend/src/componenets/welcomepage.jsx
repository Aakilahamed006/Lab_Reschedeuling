import React from 'react';
import { useNavigate } from "react-router-dom";
import './WelcomePage.css';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      <div className="hero-section">
        <h1 className="title animate-fade">University of Jaffna</h1>
        <h2 className="subtitle animate-fade-delay">Lab Rescheduling Management System</h2>
        <p className="description animate-fade-delay2">
          A centralized platform for students, instructors, and coordinators to manage lab scheduling efficiently.
        </p>
      </div>

      <div className="roles-container">
        <div className="role-card" onClick={() => navigate('/student-login')}>
          <h3>🎓 Student</h3>
          <p>Submit reschedule requests and track their status.</p>
        </div>
        <div className="role-card" onClick={() => navigate('/coordinator-login')}>
          <h3>📋 Coordinator</h3>
          <p>Review, manage, and approve student requests.</p>
        </div>
        <div className="role-card" onClick={() => navigate('/instructor-login')}>
          <h3>👩‍🏫 Instructor</h3>
          <p>View assigned labs and respond to scheduling changes.</p>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} University of Jaffna - Faculty of Engineering</p>
      </footer>
    </div>
  );
}

export default WelcomePage;
