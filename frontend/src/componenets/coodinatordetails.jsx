
import {  useLocation } from 'react-router-dom';


function CoordinatorDetails() {
  
  const location = useLocation();
  const { availability} = location.state || {};  // Make sure to pass this from previous page

  

  
  return (
    <div>
      <h1>Coordinator Details</h1>
      <p><strong>Name:</strong> {availability.Coodinator_Name}</p>
      <p><strong>Email:</strong> {availability.Coodinator_Email}</p>
    </div>
  );
}

export default CoordinatorDetails;
