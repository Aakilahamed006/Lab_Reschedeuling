import './CoordinatorLoginPage.css';

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function InstructorLoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name, password };

    try {
      const response = await fetch('http://localhost/Lab_Rescheduling/verify_instructor.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        setErrorMessage('');
        navigate("/instructor-dashboard", { state: { availability: data.instructor } });
      } else {
        setErrorMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error sending data:', error);
      setErrorMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Instructor Login</h1>

      {errorMessage && (
        <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
          {errorMessage}
        </div>
      )}

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Username:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>


        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="login-button">Login</button>
      </form>

      <p className="signup-text">
        Don't have an account?{' '}
        <button type="button" className="signup-button" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default InstructorLoginPage;
