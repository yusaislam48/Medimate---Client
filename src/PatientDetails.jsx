// frontend/src/PatientDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchPatient();
    fetchPrescriptions();
  }, []);

  const fetchPatient = async () => {
    try {
      const response = await axios.get(`https://medimate-backend-production.up.railway.app/api/patients/${id}`);
      setPatient(response.data);
    } catch (error) {
      console.error('Error fetching patient:', error);
    }
  };

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get(`https://medimate-backend-production.up.railway.app/api/patients/${id}/prescriptions`);
      setPrescriptions(response.data);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  if (!patient) {
    return <div>Loading patient details...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Patient Details</h2>
      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>Age:</strong> {patient.age}</p>
      {/* Add other patient details as needed */}

      <h3>Prescriptions</h3>
      {prescriptions.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Morning</th>
              <th>Day</th>
              <th>Night</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription, index) => (
              <tr key={index}>
                <td>{prescription.medicine}</td>
                <td>{prescription.morning}</td>
                <td>{prescription.day}</td>
                <td>{prescription.night}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No prescriptions found for this patient.</p>
      )}
    </div>
  );
}

export default PatientDetails;
