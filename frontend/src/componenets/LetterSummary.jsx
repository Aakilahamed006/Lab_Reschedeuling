import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LetterSummary() {
  const location = useLocation();
  const { CoordinatorId } = location.state || {};
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    axios.post('http://localhost/Lab_Rescheduling/GetMedicalLetterSummary.php', {
      subject_coordinator_id: CoordinatorId
    })
      .then(response => {
        setSummaryData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the summary data!", error);
      });
  }, [CoordinatorId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Medical Letter Summary</h2>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
             
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Practical ID</th>
              <th>Practical Name</th>
              <th>Instructor ID</th>
              <th>Instructor Name</th>
              <th>Approved</th>
              <th>Checked By Instructor</th>
              <th>Rescheduled Date</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.map(letter => (
              <tr key={letter.Letter_Id} style={styles.tableRow}>
               
                <td>{letter.Student_Id}</td>
                <td>{letter.Student_Name}</td>
                <td>{letter.Practical_Id}</td>
                <td>{letter.Practical_Name}</td>
                <td>{letter.Instructor_Id}</td>
                <td>{letter.Instructor_Name}</td>
                <td>{letter.Approved ? "Yes" : "No"}</td>
                <td>{letter.Checked ? "Yes" : "No"}</td>
                <td>{letter.RescheduleDate ? letter.RescheduleDate : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f9f9f9',
    minHeight: '100vh'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
    fontSize: '2rem'
  },
  tableWrapper: {
    overflowX: 'auto',
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeaderRow: {
    backgroundColor: '#4f46e5',
    color: '#fff'
  },
  tableRow: {
    borderBottom: '1px solid #e0e0e0',
    textAlign: 'center',
    backgroundColor: '#fafafa'
  },
  th: {
    padding: '0.75rem',
    fontWeight: 'bold'
  },
  td: {
    padding: '0.75rem'
  }
};

export default LetterSummary;
