import { useLocation, useNavigate } from 'react-router-dom';


function StudentDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { availability } = location.state || {};  

  const handleSubmit = () => {
    navigate("/medical-letter", { state: { studentId: availability.Student_Id } });
  }

  return (
    <div className="student-details-container">
      <h1 className="student-details-header">Hi {availability.Student_Name}</h1>
      <p className="student-details-info"><strong>Email:</strong> {availability.Student_Email}</p>
      <p className="student-details-info"><strong>Student ID:</strong> {availability.Student_Id}</p>

      <div className="student-details-button-container">
        <button className="student-details-submit-button" onClick={handleSubmit}>
          Submit a lab rescheduling request
        </button>
      </div>
    </div>
  );
}

export default StudentDetails;
