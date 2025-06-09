import './CoordinatorLoginPage.css';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function StudentSignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, password, email };

    try {
      // First, create instructor account
      const signupResponse = await fetch('http://localhost/Lab_Rescheduling/studentindex.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (signupResponse.ok) {
        const signupData = await signupResponse.json();
        console.log('Account created:', signupData);

        // Now verify student account
        const verifyResponse = await fetch('http://localhost/Lab_Rescheduling/verify_student.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (verifyResponse.ok) {
          const verifyData = await verifyResponse.json();
          console.log('Verification successful:', verifyData);
          setErrorMessage('');
          navigate("/student-dashboard", { state: { availability: verifyData.student } });
        } else {
          setErrorMessage('Verification failed. Please try again.');
        }

      } else {
        setErrorMessage('Signup failed. Account may already exist.');
      }

    } catch (error) {
      console.error('Error communicating with server:', error);
      setErrorMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Student Sign Up</h1>

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
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <button type="submit" className="login-button">Create Account</button>
      </form>
    </div>
  );
}

export default StudentSignupPage;
