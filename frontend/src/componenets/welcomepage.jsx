import React from 'react';
import { useNavigate } from "react-router-dom";

  
function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div>
     <h1>University of Oxford</h1>   
     <h2>Welcome to the Lab Rescheduling System</h2>
     <button onClick={() => navigate('/student-login')}>Student</button>
     <button onClick={() => navigate('/coordinator-login')}>Coordinator</button>
     <button onClick={() => navigate('/instructor-login')}>Instructor</button>

     <p>Doesn't have an Account</p>
        <button>Sign Up</button>
    </div>

    
  );
}
export default WelcomePage;
