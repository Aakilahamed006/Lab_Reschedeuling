
import {  useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';


function MedicalLetters() {
  
  const location = useLocation();
  const { CoordinatorId} = location.state || {};  
  const [letters, setletters] = useState([]);
  const coordinatorId = CoordinatorId ?? null;

useEffect(() => {
  if (coordinatorId !== null) {
    Axios.post(`http://localhost/Lab_Rescheduling/GetMedicalLetterForCoordinator.php`, {
      subject_coordinator_id: coordinatorId
    })
    .then(response => {
      setletters(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }
}, [coordinatorId]);
  

  return (
      <div>
      <h1>All Letters</h1>
     


      {letters.length === 0 && <p>No letters found.</p>}

      {letters.map(letter => (
        <div key={letter.Letter_Id} style={{ marginBottom: '20px' }}>
          <p><strong>Student ID:</strong> {letter.Student_Id}</p>
          <p><strong>Practical ID:</strong> {letter.Practical_Id}</p>
          
          {/* Display the letter image */}
          <img 
            src={`data:image/png;base64,${letter.Letter_Image}`} 
            alt="Medical Letter" 
            style={{ maxWidth: '400px', border: '1px solid #ccc' }}
          />
          
        
        </div>
      ))}
    </div>
    
    
  );
}

export default MedicalLetters;
