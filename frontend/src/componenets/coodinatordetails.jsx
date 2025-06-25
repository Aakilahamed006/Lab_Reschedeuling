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
      <style>{`
        .container {
          max-width: 1000px;
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
          margin: 5px 0;
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
          color: #d0d0d0;
          font-style: italic;
          margin-top: 2px;
        }
      `}</style>

      <div className="container">
        <h1>Hi {availability?.Coodinator_Name}</h1>
        <p className="intro">
          Welcome back! Use the dashboard below to manage and review medical request letters efficiently.
        </p>

        <div className="info">
          <div className="section-heading">Your Details</div>
          <p><strong>Your ID:</strong> {availability?.Coodinator_Id}</p>
          <p><strong>Your Email:</strong> {availability?.Coodinator_Email}</p>
        </div>

        <div className="section-heading">Coordinator Dashboard</div>
        <div className="button-group">
          <button className="view-requests-button" onClick={handleRecentSubmit}>
            View Recent Request Letters
            <div className="btn-desc">Check the latest medical request letters submitted by students.</div>
          </button>

          <button className="view-requests-button" onClick={handleSubmit}>
            View All Request Letters
            <div className="btn-desc">Browse through all submitted medical request letters.</div>
          </button>

          <button className="view-requests-button" onClick={handleSummarySubmit}>
            View Summary of Request Letters
            <div className="btn-desc">Review overall statistics and reports of medical requests.</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoordinatorDetails;
