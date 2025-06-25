import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import axios from 'axios';
import './medicalletter.css';

function MedicalLetters() {
  const location = useLocation();
  const { CoordinatorId } = location.state || {};
  const [letters, setLetters] = useState([]);
  const [practicalDetails, setPracticalDetails] = useState({});
  const [removingLetterId, setRemovingLetterId] = useState(null);
  const coordinatorId = CoordinatorId ?? null;

  useEffect(() => {
    if (coordinatorId !== null) {
      Axios.post('http://localhost/Lab_Rescheduling/GetMedicalLetterForCoordinator.php', {
        subject_coordinator_id: coordinatorId
      })
        .then(response => {
          const data = Array.isArray(response.data) ? response.data : [];
          const unCheckedLetters = data.filter(letter => 
            letter.checked_by_coordinator === "0" || 
            letter.checked_by_coordinator === 0 || 
            letter.checked_by_coordinator === null
          );
          setLetters(unCheckedLetters);
        })
        .catch(error => {
          console.error('Error fetching letters:', error);
        });
    }
  }, [coordinatorId]);

  useEffect(() => {
    const uniqueIds = [...new Set(letters.map(l => l.Practical_Id))];
    uniqueIds.forEach(id => {
      if (!practicalDetails[id]) {
        Axios.post('http://localhost/Lab_Rescheduling/getPracticalDetailsById.php', {
          Practical_Id: id
        })
          .then(response => {
            const detail = Array.isArray(response.data) ? response.data[0] : response.data;
            if (detail && detail.Practical_Id) {
              setPracticalDetails(prev => ({
                ...prev,
                [id]: detail
              }));
            }
          })
          .catch(error => {
            console.error(`Error fetching practical ID ${id}:`, error);
          });
      }
    });
  }, [letters, practicalDetails]);

  const handleAction = (LetterID, isApproved) => {
    axios.post('http://localhost/Lab_Rescheduling/approveletter.php', {
      letter_id: LetterID,
      Approved: isApproved ? 1 : 0
    })
    .then(() => {
      return axios.post('http://localhost/Lab_Rescheduling/checkedbycoodinator.php', {
        letter_id: LetterID
      });
    })
    .then(() => {
      setRemovingLetterId(LetterID);  // Start animation
      setTimeout(() => {
        setLetters(prev => prev.filter(letter => letter.Letter_Id !== LetterID));
        setRemovingLetterId(null);
      }, 500); // Wait for animation
    })
    /*.then(() => {
      if (isApproved) {
        
    const templateParams = {
      name: StudentName,
      to_name: StudentName,
      email: StudentEmail,
      FromEmail: InstructorEmail,
      practical_Name: PracticalName,
      reschedule_date: selectedDate
    };

    emailjs
      .send(
        'service_lkp2atf',
        'template_kolcns8',
        templateParams,
        'XBEH-L1BfAJbHQUDk'
      )
      .then((result) => {
        console.log('Email sent!', result.text);
        setLoading(false);
        setSuccessMessage('Reschedule confirmed and email sent!');
        setTimeout(() => {
          setSuccessMessage('');
          window.history.back();
        }, 2000);
      })
      .catch(error => {
        console.error('Error sending email:', error);
      });
  }*/}

  return (
    <div className="medical-letters-container">
      <h1 className="title">Recent Medical Letters</h1>

      {letters.length === 0 ? (
        <p className="no-letters">No letters found.</p>
      ) : (
        letters.map(letter => (
          <div 
            key={letter.Letter_Id} 
            className={`letter-card ${removingLetterId === letter.Letter_Id ? 'removing' : ''}`}
          >
            <p className="student-id"><strong>Student ID:</strong> {letter.Student_Id}</p>

            {practicalDetails[letter.Practical_Id] ? (
              <p className="practical-name">
                <strong>Practical Name:</strong> {practicalDetails[letter.Practical_Id].Practical_Name}
              </p>
            ) : (
              <p className="loading-practical"><em>Loading practical details...</em></p>
            )}

            {letter.Letter_Image ? (
              <img
                src={`data:image/png;base64,${letter.Letter_Image}`}
                alt="Medical Letter"
                className="medical-letter-image"
              />
            ) : (
              <p className="no-image">No image available.</p>
            )}

            <div className="button-group">
              <button className="approve-button" onClick={() => handleAction(letter.Letter_Id, true)}>Approve Letter</button>
              <button className="reject-button" onClick={() => handleAction(letter.Letter_Id, false)}>Reject Letter</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MedicalLetters;
