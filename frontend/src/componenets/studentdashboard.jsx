
import {  useLocation ,useNavigate} from 'react-router-dom';


function StudentDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { availability} = location.state || {};  

  const handleSubmit = () => {
    navigate("/medical-letter", { state: { studentId: availability.Student_Id } });

  }

  return (
    <div>
      <h1>Hi {availability.Student_Name}</h1>
       <p><strong>Email:</strong> {availability.Student_Email}</p>
      <p><strong>Student ID:</strong> {availability.Student_Id}</p>

      <div>
        <button className ="submit medical" onClick={() => handleSubmit()}>Submit a lab rescheduling request</button>
      </div>

    </div>
    
  );
}

export default StudentDetails;
