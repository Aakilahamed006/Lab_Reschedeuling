import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './LabRescheduling.css'; // 👈 import custom styles

function LabRescheduling() {
  const location = useLocation();
  const {
    
    PracticalId,
    StudentId,
    PracticalName,
    StudentName,
   
    InstructorEmail,
    StudentEmail,
    letterID
  } = location.state || {};

  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [unavailabledates, setUnavailabledates] = useState([]);

  useEffect(() => {
    axios.post('http://localhost/Lab_Rescheduling/getLabScheduleDetailsByStudentID.php', {
      StudentId: StudentId
    })
    .then((response) => {
      const data = Array.isArray(response.data) ? response.data : [];
      const unavailable = data.map(lab => new Date(lab.Date));
      setUnavailabledates(unavailable);
    })
    .catch((error) => {
      console.error('Error fetching lab details:', error);
    });
  }, [StudentId]);

  const handleSubmit = () => {
    if (!selectedDate) {
      setError('Please select a date.');
      return;
    }

    const today = new Date().setHours(0, 0, 0, 0);
    const chosen = selectedDate.setHours(0, 0, 0, 0);
    if (chosen < today) {
      setError('Selected date cannot be in the past.');
      return;
    }

    setError('');
    setLoading(true);

    axios.post('http://localhost/Lab_Rescheduling/checkedbyinstructor.php', {
      letter_id: letterID
    });

    axios.post('http://localhost/Lab_Rescheduling/rescheduleAlab.php', {
      PracticalId,
      StudentId,
      RescheduleDate: selectedDate.toISOString().split('T')[0]
    });

    const templateParams = {
      name: StudentName,
      to_name: StudentName,
      email: StudentEmail,
      FromEmail: InstructorEmail,
      practical_Name: PracticalName,
      reschedule_date: selectedDate.toISOString().split('T')[0]
    };

    emailjs.send(
      'service_lkp2atf',
      'template_kolcns8',
      templateParams,
      'XBEH-L1BfAJbHQUDk'
    )
    .then(() => {
      setLoading(false);
      setSuccessMessage('Reschedule confirmed and email sent!');
      setTimeout(() => {
        setSuccessMessage('');
        window.history.back();
      }, 2000);
    })
    .catch((error) => {
      console.error('Email send failed:', error);
      setLoading(false);
    });
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <p style={styles.heading}>Select the date to reschedule the lab</p>

        <div style={{ position: 'relative' }}>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setError('');
            }}
            excludeDates={unavailabledates}
            minDate={new Date()}
            placeholderText="Choose a valid date"
            dateFormat="yyyy-MM-dd"
            className="custom-datepicker"
          />
          <span style={styles.icon}>📅</span>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button
          onClick={handleSubmit}
          style={{
            ...styles.button,
            opacity: selectedDate && !loading ? 1 : 0.5,
            cursor: selectedDate && !loading ? 'pointer' : 'not-allowed'
          }}
          disabled={!selectedDate || loading}
        >
          {loading ? 'Processing...' : 'Submit Reschedule'}
        </button>
      </div>

      {successMessage && (
        <div style={styles.popup}>
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    backgroundColor: '#f3f4f6',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: 'relative'
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center'
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '1.5rem',
    color: '#2e2e2e'
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#6264a7',
    color: '#fff',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    transition: 'background-color 0.3s',
    marginTop: '1rem'
  },
  error: {
    color: '#d32f2f',
    fontSize: '0.9rem',
    marginTop: '0.5rem'
  },
  popup: {
    position: 'absolute',
    bottom: '2rem',
    backgroundColor: '#2e7d32',
    color: '#fff',
    padding: '1rem 2rem',
    borderRadius: '8px',
    animation: 'fadeIn 0.5s ease-out',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
  },
  icon: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    fontSize: '18px',
    color: '#666'
  }
};

export default LabRescheduling;
