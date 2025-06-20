import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ApprovedLettersInstructors() {
  const location = useLocation();
  const { InstructorId } = location.state || {};
  const [letters, setLetters] = useState([]);

  const instructorId = InstructorId ?? null;

  useEffect(() => {
    axios.post('http://localhost/Lab_Rescheduling/GetMedicalLetterForInstructors.php', {
      instructor_id: instructorId
    })
    .then(response => {
      const data = Array.isArray(response.data) ? response.data : [];
      setLetters(data);
      console.log('Fetched letters:', data);
    })
    .catch(error => {
      console.error('Error fetching letters:', error);
    });
  }, [instructorId]);

  return (
    <div>
      {/* Embedded Styling */}
      <style>
        {`
          .container {
            max-width: 1200px;
            margin: 40px auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 16px;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
          }

          .header {
            font-size: 28px;
            color: #2b2b2b;
            margin-bottom: 20px;
            text-align: center;
          }

          .letter-card {
            background-color: #ffffff;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s, box-shadow 0.2s;
          }

          .letter-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }

          .letter-info {
            font-size: 16px;
            margin: 10px 0;
          }

          strong {
            color: #444;
          }

          .no-data {
            text-align: center;
            font-size: 18px;
            color: #666;
            margin-top: 50px;
          }
        `}
      </style>

      <div className="container">
        <h1 className="header">Approved Medical Letters</h1>
        

        {letters.length === 0 ? (
          <div className="no-data">No approved letters found.</div>
        ) : (
          letters.map((letter) => (
            <div className="letter-card" key={letter.Letter_Id}>
              <p className="letter-info"><strong>Letter ID:</strong> {letter.Letter_Id}</p>
              <p className="letter-info"><strong>Student ID:</strong> {letter.Student_Id}</p>
              <p className="letter-info"><strong>Student Name:</strong> {letter.Student_Name}</p>
              <p className="letter-info"><strong>Practical Name:</strong> {letter.Practical_Name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ApprovedLettersInstructors;
