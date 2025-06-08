import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from './componenets/welcomepage';
import StudentLoginPage from './componenets/studentlogin';
import CoordinatorLoginPage from './componenets/coodinatorlogin';
import InstructorLoginPage from './componenets/instructorloginpage';
import CoordinatorDetails from './componenets/coodinatordetails';
import InstructorDetails from './componenets/instructordashboard';
import StudentDetails from './componenets/studentdashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/student-login" element={<StudentLoginPage />} />
        <Route path="/coordinator-login" element={<CoordinatorLoginPage />} />
        <Route path="/instructor-login" element={<InstructorLoginPage />} />
        <Route path="/coordinator-dashboard" element={<CoordinatorDetails />} />
        <Route path="/instructor-dashboard" element={<InstructorDetails />} />
        <Route path="/student-dashboard" element={<StudentDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
