import { useLocation, useNavigate } from 'react-router-dom';

function StudentDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { availability } = location.state || {};

  const handleSubmit = () => {
    navigate("/medical-letter", { state: { studentId: availability.Student_Id } });
  };
  const handleViewLabSchedule = () => {
    navigate("/lab-schedule", { state: { studentId: availability.Student_Id } });
  };
  const handleSubmitStatus = () => {
    navigate("/rescheduling-status", { state: { studentId: availability.Student_Id } });
  }

  return (
    <div>
      <style>{`
        .container {
          max-width: 900px;
          min-height: 600px;
          margin: 40px auto;
          padding: 40px;
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }

        h1 {
          font-size: 30px;
          color: #2b2b2b;
          margin-bottom: 10px;
        }

        .intro {
          margin-bottom: 30px;
          font-size: 16px;
          color: #555;
        }

        .info p {
          font-size: 16px;
          margin: 6px 0;
        }

        .section-heading {
          font-size: 18px;
          color: #555;
          margin-bottom: 10px;
          margin-top: 20px;
          font-weight: 600;
        }

        .button-group {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .submit-button {
          background-color: #6264A7;
          color: #fff;
          border: none;
          padding: 14px 20px;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          text-align: left;
        }

        .submit-button:hover {
          background-color: #4b4d94;
        }

        .btn-desc {
          font-size: 13px;
          color: #d0d0d0;
          font-style: italic;
          margin-top: 2px;
        }
      `}</style>

      <div className="container">
        <h1>Welcome, {availability?.Student_Name}</h1>
        <p className="intro">
          Access your lab schedules or submit rescheduling requests using the options below.
        </p>

        <div className="info">
          <div className="section-heading">Your Details</div>
          <p><strong>Student ID:</strong> {availability?.Student_Id}</p>
          <p><strong>Email:</strong> {availability?.Student_Email}</p>
        </div>

        <div className="section-heading">Student Actions</div>
        <div className="button-group">
          <button className="submit-button" onClick={handleSubmit}>
            Submit a Lab Rescheduling Request
            <div className="btn-desc">Request a change to your assigned lab schedule.</div>
          </button>

          <button className="submit-button" onClick={handleViewLabSchedule}>
            View Lab Schedule
            <div className="btn-desc">Check your upcoming lab schedules and details.</div>
          </button>
         <button className="submit-button" onClick={handleSubmitStatus}>
             Check Rescheduling Status
           <div className="btn-desc">Track your lab rescheduling requests and updates.</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
