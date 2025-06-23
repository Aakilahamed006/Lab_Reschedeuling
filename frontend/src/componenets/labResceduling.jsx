import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';



function LabRescheduling() {
  const location = useLocation();
  const { InstructorId, PracticalId,StudentId } = location.state || {};

  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setError(''); // clear error on new input
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
    console.log("Submitting reschedule with:", { InstructorId, PracticalId, selectedDate });

    // Uncomment to send to backend
    /*
    axios.post('/api/reschedule-lab', {
      instructorId: InstructorId,
      practicalId: PracticalId,
      newDate: selectedDate
    })
    .then(response => {
      console.log('Reschedule successful', response.data);
    })
    .catch(error => {
      console.error('Error rescheduling', error);
    });
    */

    const templateParams = {
    name:'Baakil',
    to_name:'Aakil',
    email: 'ahamedaakil006@gmail.com',
    FromEmail:'aakilahamed2022@gmail.com',
    practical_Name: 'Control System',
    reschedule_date: selectedDate,
  };

  emailjs.send(
    'service_lkp2atf',
    'template_kolcns8',
    templateParams,
    'XBEH-L1BfAJbHQUDk'
  )
  .then((result) => {
    console.log('Email sent!', result.text);
    // Show success message or redirect
  })
  .catch((error) => {
    console.error('Email send failed:', error);
  });
  };

  const todayDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

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
            opacity: selectedDate ? 1 : 0.5,
            cursor: selectedDate ? 'pointer' : 'not-allowed'
          }}
          disabled={!selectedDate}
        >
          Submit Reschedule
        </button>
      </div>
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
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '1.5rem',
    color: '#2e2e2e',
  },
  label: {
    fontSize: '1rem',
    marginBottom: '1rem',
    color: '#444',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '1rem',
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
  },
  error: {
    color: '#d32f2f',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  }
};

export default LabRescheduling;
