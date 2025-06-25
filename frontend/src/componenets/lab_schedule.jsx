import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';

function LabSchedule() {
  const location = useLocation();
  const { studentId } = location.state || {};
  const [labSchedule, setLabSchedule] = useState([]);

  useEffect(() => {
    const fetchLabSchedule = async () => {
      try {
        const response = await axios.post(
          "http://localhost/Lab_Rescheduling/getLabScheduleDetailsByStudentID.php",
          {
            StudentId: studentId
          }
        );
        setLabSchedule(response.data);
      } catch (error) {
        console.error("Error fetching lab schedule:", error);
      }
    };

    fetchLabSchedule();
  }, [studentId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Lab Timetable</h2>

      {labSchedule.length === 0 ? (
        <p style={styles.noData}>No lab schedule found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.headerCell}>Practical Name</th>
              <th style={styles.headerCell}>Lab Name</th>
              <th style={styles.headerCell}>Date</th>
              <th style={styles.headerCell}>Location</th>
              
            </tr>
          </thead>
          <tbody>
            {labSchedule.map((lab, index) => (
              <tr key={index} style={styles.dataRow}>
                <td style={styles.cell}>{lab.Practical_Name}</td>
                <td style={styles.cell}>{lab.Lab_Name}</td>
                <td style={styles.cell}>{lab.Date}</td>
                <td style={styles.cell}>{lab.Location}</td>
                
               
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f4f6fa",
    minHeight: "100vh"
  },
  heading: {
    fontSize: "1.8rem",
    fontWeight: "600",
    marginBottom: "1.5rem",
    color: "#333"
  },
  noData: {
    color: "#777"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
  },
  headerRow: {
    backgroundColor: "#6264a7",
    color: "#ffffff",
    textAlign: "left"
  },
  headerCell: {
    padding: "1rem",
    fontWeight: "bold",
    borderBottom: "1px solid #ddd"
  },
  dataRow: {
    backgroundColor: "#f9f9f9",
    transition: "background 0.3s",
  },
  cell: {
    padding: "0.75rem 1rem",
    borderBottom: "1px solid #eee"
  }
};

export default LabSchedule;
