// frontend/src/NursePortal.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function NursePortal() {
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

  const renderStatus = (status) => {
    if (status === 'Yes') {
      return <span className="text-success">{status}</span>;
    } else {
      return <span className="text-danger">{status}</span>;
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Nurse Portal</h2>
      <table className="table table-striped">
        <thead className="table-primary">
          <tr>
            <th>Patient Name</th>
            <th>Morning</th>
            <th>Day</th>
            <th>Night</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{renderStatus(patient.distributionStatus?.morning || 'No')}</td>
                <td>{renderStatus(patient.distributionStatus?.day || 'No')}</td>
                <td>{renderStatus(patient.distributionStatus?.night || 'No')}</td>
                <td>
                  <Link to={`/patients/${patient.id}`} className="btn btn-info btn-sm">
                    View Details
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No patients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default NursePortal;
