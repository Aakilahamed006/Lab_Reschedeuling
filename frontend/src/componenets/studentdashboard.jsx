
import {  useLocation } from 'react-router-dom';


function StudentDetails() {

  const location = useLocation();
  const { availability} = location.state || {};  // Make sure to pass this from previous page

  

  
  return (
    <div>
      <h1>Student Details</h1>
      <p><strong>Name:</strong> {availability.Student_Name}</p>
      <p><strong>Email:</strong> {availability.Student_Email}</p>
    </div>
  );
}

export default StudentDetails;
