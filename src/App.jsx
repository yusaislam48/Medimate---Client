// frontend/src/App.jsx

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PatientRegistrationForm from './PatientRegistrationForm';
import PatientList from './PatientList';
import DoctorPage from './DoctorPage'; // Import the DoctorPage component
import PatientDetails from './PatientDetails';

function App() {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Medimate
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Register Patient
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/patients">
                  Patient List
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/doctor">
                  Doctor Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<PatientRegistrationForm />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/doctor" element={<DoctorPage />} /> {/* Add this route */}
        <Route path="/patients/:id" element={<PatientDetails />} />
        <Route path="/patients/:id" element={<PatientDetails />} />
        
      </Routes>
    </div>
  );
}

export default App;
