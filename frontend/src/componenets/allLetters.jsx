import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import axios from 'axios';
import './medicalletter.css';

function AllMedicalLetters() {
  const location = useLocation();
  const { CoordinatorId } = location.state || {};
  const [letters, setLetters] = useState([]);
  const [practicalDetails, setPracticalDetails] = useState({});
  const coordinatorId = CoordinatorId ?? null;

  const fetchLetters = () => {
    if (coordinatorId !== null) {
      Axios.post('http://localhost/Lab_Rescheduling/GetMedicalLetterForCoordinator.php', {
        subject_coordinator_id: coordinatorId
      })
        .then(response => {
          const data = Array.isArray(response.data) ? response.data : [];
          setLetters(data);
          console.log('Fetched letters:', data);
        })
        .catch(error => {
          console.error('Error fetching letters:', error);
        });
    }
  };

  useEffect(() => {
    fetchLetters();
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

  const updateLetterStatus = (LetterID, approvedValue) => {
    axios.post('http://localhost/Lab_Rescheduling/approveletter.php', {
      letter_id: LetterID,
      Approved: approvedValue
    }).then(() => {
        window.location.reload();
      return axios.post('http://localhost/Lab_Rescheduling/checkedbycoordinator.php', { letter_id: LetterID });
    }).then(() => {
      console.log('Letter status updated, refetching...');
      fetchLetters();  // REFETCH here after update
      

    }).catch(error => {
      console.error('Error:', error);
    });
    
  };

  return (
    <div className="medical-letters-container">
      <h1 className="title">All Medical Letters</h1>

      {letters.length === 0 ? (
        <p className="no-letters">No letters found.</p>
      ) : (
        letters.map(letter => (
          <div key={letter.Letter_Id} className="letter-card">
            <p className="student-id"><strong>Student ID:</strong> {letter.Student_Id}</p>

            <p className="student-id">
              <strong
                style={{
                  color: letter.Approved === 1 
                    ? "blue" 
                    : letter.Approved === 0 
                    ? "red" 
                    : "orange"
                }}
              >
                {letter.Approved === 1 
                  ? "Approved" 
                  : letter.Approved === 0 
                  ? "Rejected" 
                  : "Pending..."}
              </strong>
            </p>

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
              <button className="approve-button" onClick={() => updateLetterStatus(letter.Letter_Id, 1)}>Approve Letter</button>
              <button className="reject-button" onClick={() => updateLetterStatus(letter.Letter_Id, 0)}>Reject Letter</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AllMedicalLetters;
