// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSelection from './components/LoginSelection';
import ErrorBoundary from './ErrorBoundary';
import AdminLogin from './components/AdminLogin';
import AddRecords from './components/AddRecords';
import PrisonerRegistration from './components/PrisonerRegistration';
import PrisonerLogin from './components/PrisonerLogin';
import PrisonerDashboard from './components/PrisonerDashboard';
import CallPage from './components/CallPage'; // ✅ new Twilio call page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSelection />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/add-records" element={<AddRecords />} />
        <Route path="/add-prisoner" element={<PrisonerRegistration />} />
        <Route path="/prisoner-login" element={<PrisonerLogin />} />

        {/* ✅ Prisoner dashboard wrapped in ErrorBoundary */}
        <Route
          path="/prisonerdashboard"
          element={
            <ErrorBoundary>
              <PrisonerDashboard />
            </ErrorBoundary>
          }
        />

        {/* ✅ Twilio call page route */}
        <Route path="/call/:roomName" element={<CallPage />} />

        {/* later add <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
