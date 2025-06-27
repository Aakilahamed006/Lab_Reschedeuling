import { useState, useEffect } from "react";
import axios from "axios";

import {  useLocation } from 'react-router-dom';

function MedicalLetter() {
  
  const location = useLocation();

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [student_id, setStudentId] = useState('');
  const [practical, setPractical] = useState([]);
  const [practical_id, setPractical_id] = useState(''); 
  const [letter_image, setMedicalLetter] = useState(null);

  const studentid = location.state?.studentId || '';

  useEffect(() => {
    setStudentId(studentid);
  }, [studentid]);

  useEffect(() => {
    axios.get('http://localhost/Lab_Rescheduling/practicalindex.php', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const data = response.data;
        setPractical(data);  // adjust key to your actual response
        
         
        
      })
      .catch((error) => {
        console.error('Error fetching practical name:', error);
        setErrorMessage('Error fetching practical name');
      });
  }, []);

  const handleSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('student_id', student_id);
  formData.append('practical_id', practical_id);
  formData.append('letter_image', letter_image); // This should be a File object

  try {
    const response = await axios.post(
      'http://localhost/Lab_Rescheduling/medical_letterindex.php',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.data.success) {
      setSuccessMessage('Medical letter request submitted successfully.');
      setErrorMessage('');
    } else {
      setErrorMessage(response.data.message || 'Submission failed');
    }
  } catch (error) {
    console.error('Error submitting medical letter request:', error);
    setErrorMessage('Error submitting medical letter request');
  }
};

  

  return (
    <div className="login-container">
      <h1 className="login-title">Medical Letter Request</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="studentId" className="form-label">Your Student ID:</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            required
            className="form-input"
            value={student_id}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="practicalName" className="form-label">Practical Name:</label>
          <select
            id="practicalName"
            name="practicalName"
            required
            className="form-input"
            onChange={(e) => setPractical_id(e.target.value)}
            value={practical_id}
          >
            <option value="">Select a Practical</option>
            {practical.map((item) => (
              <option key={item.Practical_Id} value={item.Practical_Id}>
                {item.Practical_Name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
  <label htmlFor="medicalLetter" className="form-label">Upload Medical Letter:</label>
  <input
    type="file"
    id="medicalLetter"
    name="medicalLetter"
    accept="image/*"
    required
    className="form-input"
    onChange={(e) => setMedicalLetter(e.target.files[0])}
  />
</div>

        <button type="submit" className="login-button">Submit Request</button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
}

export default MedicalLetter;
