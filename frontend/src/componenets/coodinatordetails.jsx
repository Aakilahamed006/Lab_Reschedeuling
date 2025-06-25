import { useLocation, useNavigate } from 'react-router-dom';

function CoordinatorDetails() {
  const location = useLocation();
  const { availability } = location.state || {};
  const navigate = useNavigate();

  const coordinatorId = availability?.Coodinator_Id ?? null;

  const handleRecentSubmit = () => {
    navigate("/medical-letters", { state: { CoordinatorId: coordinatorId } });
  };

  const handleSubmit = () => {
    navigate("/medical-letters-recent", { state: { CoordinatorId: coordinatorId } });
  };
  const handleSummarySubmit = () => {
    navigate("/Summary", { state: { CoordinatorId: coordinatorId } });
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

          .view-requests-button {
            background-color: #6264A7;
            color: #fff;
            border: none;
            padding: 12px 20px;
            font-size: 15px;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 20px;
            transition: background-color 0.3s ease;
            margin-right: 10px;
          }

          .view-requests-button:hover {
            background-color: #4b4d94;
          }
        `}
      </style>

      {/* UI Content */}
      <div className="container">
        <h1>Hi {availability?.Coodinator_Name}</h1>
        <p><strong>Your ID:</strong> {availability?.Coodinator_Id}</p>
        <p><strong>Your Email:</strong> {availability?.Coodinator_Email}</p>

        <button className="view-requests-button" onClick={handleRecentSubmit}>
          View Recent Request Letters
        </button>
            <button className="view-requests-button" onClick={handleSubmit}>
          View All the Request Letters
        </button>
             <button className="view-requests-button" onClick={handleSummarySubmit}>
          View Summary of the Request Letters
        </button>
      </div>
    </div>
  );
}

export default CoordinatorDetails;
