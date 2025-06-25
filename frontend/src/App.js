import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from './componenets/welcomepage';
import StudentLoginPage from './componenets/studentlogin';
import CoordinatorLoginPage from './componenets/coodinatorlogin';
import InstructorLoginPage from './componenets/instructorloginpage';
import CoordinatorDetails from './componenets/coodinatordetails';
import InstructorDetails from './componenets/instructordashboard';
import StudentDetails from './componenets/studentdashboard';
import InstructorSignupPage from './componenets/instructorsignupform';
import CoodinatorSignupPage from './componenets/coodinatorsignuppage.jsx';
import StudentSignupPage from './componenets/studentsignuppage.jsx';
import MedicalLetter from './componenets/medicalletter';
import MedicalLetters from './componenets/medicalletters.jsx';
import AllMedicalLetters from './componenets/allLetters.jsx';
import ApprovedLettersInstructors from './componenets/approvedlettrsinstructors.jsx';
import RescheduleLabs from './componenets/rescheduleLabs.jsx';
import LabRescheduling from './componenets/labResceduling.jsx';
import LetterSummary from './componenets/LetterSummary.jsx';
import LabSchedule from './componenets/lab_schedule.jsx';

import ScheduleLabs from './componenets/ScheduleLabs.jsx';
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
        <Route path="/instructor-signup" element={<InstructorSignupPage />} />
        <Route path="/coordinator-signup" element={<CoodinatorSignupPage />} />
        <Route path="/student-signup" element={<StudentSignupPage />} />
        <Route path="/medical-letter" element={<MedicalLetter />} />
         <Route path="/medical-letters" element={<MedicalLetters />} />
        <Route path="/medical-letters-recent" element={<AllMedicalLetters />} />
        <Route path="/instructor-" element={<AllMedicalLetters />} />
        <Route path="/all-approved-letters-instructors" element={<ApprovedLettersInstructors />} />
        <Route path="/RescheduleLabs" element={<RescheduleLabs />} />
        <Route path="/LabRescheduling" element={<LabRescheduling/>} />
        <Route path="/Summary" element={<LetterSummary />} />
        <Route path="/lab-schedule" element={<LabSchedule />} />
        <Route path="/ScheduleLabs" element={<ScheduleLabs />} />
      </Routes>
    </Router>
  );
}

export default App;
