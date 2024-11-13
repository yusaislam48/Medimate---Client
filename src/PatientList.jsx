// frontend/src/PatientList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('https://medimate-backend-production.up.railway.app/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Patient List</h2>
      <table className="table table-striped">
        <thead className="table-primary">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Date of Admission</th>
            <th>Ward Number</th>
            <th>Bed Number</th>
            <th>RFID Card Number</th>
            <th>Prescription</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.address}</td>
                <td>{new Date(patient.dateOfAdmission).toLocaleDateString()}</td>
                <td>{patient.wardNumber}</td>
                <td>{patient.bedNumber}</td>
                <td>{patient.rfidCardNumber}</td>
                <td>
                    <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No patients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PatientList;
