import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';

function LabRescheduling() {
  const location = useLocation();
  const {
    InstructorId,
    PracticalId,
    StudentId,
    PracticalName,
    StudentName,
    InstructorName,
    InstructorEmail,
    StudentEmail,
    letterID
  } = location.state || {};

  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setError('');
  };

  const handleSubmit = () => {
    const today = new Date().toISOString().split('T')[0];

    if (!selectedDate) {
      setError('Please select a date.');
      return;
    }

    if (selectedDate < today) {
      setError('Selected date cannot be in the past.');
      return;
    }

    setError('');
    setLoading(true); // Start loading

    axios
      .post('http://localhost/Lab_Rescheduling/checkedbyinstructor.php', {
        letter_id: letterID
      })
      .then((response) => {
        console.log('Reschedule successful', response.data);
      })
      .catch((error) => {
        console.error('Error rescheduling', error);
        setLoading(false);
      });

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
      .catch((error) => {
        console.error('Email send failed:', error);
        setLoading(false);
      });
  };

  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <p style={styles.heading}>Select the date to reschedule the lab</p>

        <input
          type="date"
          min={todayDate}
          value={selectedDate}
          onChange={handleDateChange}
          style={styles.input}
        />

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

      {/* Success Popup */}
      {successMessage && (
        <div style={styles.popup}>
          <p>{successMessage}</p>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes spinner {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
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
  input: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '1rem'
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#6264a7',
    color: '#fff',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    transition: 'background-color 0.3s'
  },
  error: {
    color: '#d32f2f',
    fontSize: '0.9rem',
    marginBottom: '1rem'
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
  }
};

export default LabRescheduling;
