import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 👈 for redirection
import { motion } from 'framer-motion'; // 👈 animation library

function ScheduleLabs() {
  const navigate = useNavigate();

  const [practicalDetails, setPracticalDetails] = useState([]);
  const [studentDetails, setStudentDetails] = useState([]);
  const [selectedPracticalId, setSelectedPracticalId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios.post('http://localhost/Lab_Rescheduling/FilterPracticalDetailsByDate.php',
      {date: selectedDate} )// Send selected date to filter practicals)
      .then(response => setPracticalDetails(response.data))
      .catch(error => console.error('Error fetching practicals', error));

    axios.post('http://localhost/Lab_Rescheduling/studentindex.php',
      { date: selectedDate } // 
    )
      .then(response => setStudentDetails(response.data))
      .catch(error => console.error('Error fetching students', error));
  }, [selectedDate]); // Fetch students whenever selectedDate changes

  const handleStudentCheckboxChange = (studentId) => {
    setSelectedStudentIds(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPracticalId || !selectedDate || selectedStudentIds.length === 0) {
      alert("Please fill all fields and select at least one student.");
      return;
    }

    try {
      const payload = {
        PracticalId: selectedPracticalId,
        StudentIds: selectedStudentIds,
        Date: selectedDate
      };

      const res = await axios.post(
        'http://localhost/Lab_Rescheduling/createLabSchedule.php',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      setSuccessMessage(res.data.message || "Lab scheduled successfully.");

      // Wait 2 seconds, then go back
      setTimeout(() => {
        navigate(-1); // go back to previous page
      }, 2000);
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while scheduling the lab.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.container}
    >
      <h2 style={styles.heading}>Schedule Lab</h2>

      {successMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={styles.successBox}
        >
          {successMessage}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>

         <div style={styles.field}>
          <label style={styles.label}>Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={styles.input}
          />
        </div>



        <div style={styles.field}>
          <label style={styles.label}>Select Practical:</label>
          <select
            value={selectedPracticalId}
            onChange={(e) => setSelectedPracticalId(e.target.value)}
            style={styles.select}
          >
            <option value="">-- Choose Practical --</option>
            {practicalDetails.map(practical => (
              <option key={practical.Practical_Id} value={practical.Practical_Id}>
                {practical.Practical_Name}
              </option>
            ))}
          </select>
        </div>

     

        <div style={styles.field}>
          <label style={styles.label}>Select Available Students:</label>
          <div style={styles.studentList}>
            {studentDetails.map(student => (
              <div key={student.Student_Id} style={styles.studentItem}>
                <input
                  type="checkbox"
                  id={`student-${student.Student_Id}`}
                  onChange={() => handleStudentCheckboxChange(student.Student_Id)}
                  checked={selectedStudentIds.includes(student.Student_Id)}
                />
                <label htmlFor={`student-${student.Student_Id}`} style={styles.studentLabel}>
                  <strong>ID:</strong> {student.Student_Id} — {student.Student_Name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" style={styles.button}>
          Submit Lab Schedule
        </button>
      </form>
    </motion.div>
  );
}

export default ScheduleLabs;

const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f4f6f8',
    maxWidth: '800px',
    margin: 'auto',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#2b2b2b',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  select: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  input: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  studentList: {
    maxHeight: '200px',
    overflowY: 'auto',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#fff',
  },
  studentItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
  },
  studentLabel: {
    marginLeft: '10px',
    fontSize: '14px',
  },
  button: {
    backgroundColor: '#6264a7',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  successBox: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '12px 16px',
    borderRadius: '5px',
    marginBottom: '10px',
    border: '1px solid #c3e6cb',
    textAlign: 'center',
  }
};
