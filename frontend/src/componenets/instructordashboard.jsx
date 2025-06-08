
import {  useLocation } from 'react-router-dom';


function InstructorDetails() {

  const location = useLocation();
  const { availability} = location.state || {};  // Make sure to pass this from previous page

  

  
  return (
    <div>
      <h1>Instructor Details Details</h1>
      <p><strong>Name:</strong> {availability.Instructor_Name}</p>
      <p><strong>Email:</strong> {availability.Instructor_Email}</p>
    </div>
  );
}

export default InstructorDetails;
