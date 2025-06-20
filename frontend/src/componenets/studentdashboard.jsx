import { useLocation, useNavigate } from 'react-router-dom';

function StudentDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { availability } = location.state || {};

  const handleSubmit = () => {
    navigate("/medical-letter", { state: { studentId: availability.Student_Id } });
  };

  return (
    <div>
      {/* Embedded Styling */}
      <style>
        {`
          .container {
            max-width: 1000px;
            min-height: 500px; 
            margin: 40px auto;
            padding: 30px;
            background-color: #ffffff;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
          }

          h1 {
            font-size: 28px;
            color: #2b2b2b;
            margin-bottom: 20px;
          }

          p {
            font-size: 16px;
            margin: 10px 0;
          }

          strong {
            color: #444;
          }

          .submit-button {
            background-color: #6264A7;
            color: #fff;
            border: none;
            padding: 12px 20px;
            font-size: 15px;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 20px;
            transition: background-color 0.3s ease;
          }

          .submit-button:hover {
            background-color: #4b4d94;
          }
        `}
      </style>

      {/* UI Content */}
      <div className="container">
        <h1>Hi {availability?.Student_Name}</h1>
        <p><strong>Student ID:</strong> {availability?.Student_Id}</p>
        <p><strong>Email:</strong> {availability?.Student_Email}</p>

        <button className="submit-button" onClick={handleSubmit}>
          Submit a Lab Rescheduling Request
        </button>
      </div>
    </div>
  );
}

export default StudentDetails;
