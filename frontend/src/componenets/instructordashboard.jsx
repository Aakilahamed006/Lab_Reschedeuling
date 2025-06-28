import { useLocation, useNavigate } from 'react-router-dom';

function InstructorDetails() {
  const location = useLocation();
  const { availability } = location.state || {};
  const navigate = useNavigate();

  const instructorId = availability?.Instructor_Id ?? null;

  const handleViewApprovedLetters = () => {
    navigate("/all-approved-letters-instructors", { state: { InstructorId: instructorId } });
  };

  const handleViewRescheduleLab = () => {
    navigate("/RescheduleLabs", { state: { InstructorId: instructorId } });
  };

  const handleViewScheduleLab = () => {
    navigate("/ScheduleLabs", { state: { InstructorId: instructorId } });
  };

  return (
    <div>
      {/* Embedded Styling */}
      <style>
        {`
          .container {
            max-width: 1000px;
            min-height: 600px;
            margin: 40px auto;
            padding: 40px;
            background-color:rgb(255, 255, 255);
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
          }

          .section-heading {
            font-size: 18px;
            color: #555;
            margin-bottom: 10px;
            margin-top: 20px;
            font-weight: 600;
          }

          .info p {
            font-size: 16px;
            margin: 5px 0;
          }

          .button-group {
            margin-top: 30px;
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .view-requests-button {
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

          .view-requests-button:hover {
            background-color: #4b4d94;
          }

          .btn-desc {
            font-size: 13px;
            color: #e1e1e1;
            font-style: italic;
            margin-top: 2px;
          }
        `}
      </style>

      <div className="container">
        <h1>Welcome, {availability?.Instructor_Name}</h1>
        <p className="intro">
          You're logged in as an instructor. Below are your available options to manage lab-related activities.
        </p>

        <div className="info">
          <div className="section-heading">Your Details</div>
          <p><strong>ID:</strong> {availability?.Instructor_Id}</p>
          <p><strong>Email:</strong> {availability?.Instructor_Email}</p>
        </div>

        <div className="section-heading">Instructor Panel</div>
        <div className="button-group">
          <button className='view-requests-button' onClick={handleViewApprovedLetters}>
            View All Approved Letters
            <div className="btn-desc">See all the letters approved for practical rescheduling.</div>
          </button>

          <button className='view-requests-button' onClick={handleViewRescheduleLab}>
            Manage Lab Reschedules
            <div className="btn-desc">Review and process student requests to reschedule labs.</div>
          </button>

          <button className='view-requests-button' onClick={handleViewScheduleLab}>
            Schedule Labs
            <div className="btn-desc">Assign labs for your students with practicals and dates.</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstructorDetails;
