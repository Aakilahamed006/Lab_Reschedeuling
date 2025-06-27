import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';

function RescheduleStatus() {
  const location = useLocation();
  const { studentId } = location.state || {};
  const [rescheduleStatus, setRescheduleStatus] = useState([]);

  useEffect(() => {
    if (studentId) {
      axios.post("http://localhost/Lab_Rescheduling/GetMedicalLetterStatusForStudent.php", {
        student_id: studentId
      })
        .then(response => {
          const data = Array.isArray(response.data) ? response.data : [];
          setRescheduleStatus(data);
        })
        .catch(error => {
          console.error("Error fetching reschedule status:", error);
        });
    }
  }, [studentId]);

  // Embedded styles
  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    heading: {
      textAlign: 'center',
      color: '#333'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px'
    },
    th: {
      border: '1px solid #ccc',
      padding: '10px',
      backgroundColor: '#f0f0f0',
      fontWeight: 'bold',
      textAlign: 'left'
    },
    td: {
      border: '1px solid #ccc',
      padding: '10px',
      textAlign: 'left'
    },
    rowEven: {
      backgroundColor: '#fafafa'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Lab Rescheduling Request Status</h1>
      {rescheduleStatus.length === 0 ? (
        <p>No data found for this student.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              
              <th style={styles.th}>Practical Name</th>
              <th style={styles.th}>Subject</th>
              
              
              <th style={styles.th}>Instructor</th>
              <th style={styles.th}>Instructor Email</th>
              <th style={styles.th}>Coordinator</th>
              <th style={styles.th}>Coordinator Email</th>
              <th style={styles.th}>Approved</th>
              <th style={styles.th}>Reschedule Date</th>
            </tr>
          </thead>
          <tbody>
            {rescheduleStatus.map((item, index) => (
              <tr key={index} style={index % 2 === 0 ? styles.rowEven : null}>
                
                <td style={styles.td}>{item.Practical_Name}</td>
                <td style={styles.td}>{item.Subject_Name}</td>
               
                <td style={styles.td}>{item.Instructor_Name}</td>
                <td style={styles.td}>{item.Instructor_Email}</td>
                <td style={styles.td}>{item.Coodinator_Name}</td>
                <td style={styles.td}>{item.Coodinator_Email}</td>
                <td style={styles.td}>
  {(item.checked_by_coordinator == null || item.checked_by_coordinator.toString() === "0")
    ? "🕒 Pending Approval"
    : (item.Approved == null || item.Approved.toString() === "0"
        ? "❌ Rejected"
        : "✅ Approved")}
</td>
<td style={styles.td}>{item.RescheduleDate || "N/A"}</td>


              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RescheduleStatus;
