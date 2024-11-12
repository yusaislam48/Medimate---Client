// frontend/src/DoctorPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DoctorPage() {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchPatients();
    fetchMedicines();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5005/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('http://localhost:5005/api/medicines');
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  const fetchPrescriptions = async (patientId) => {
    try {
      const response = await axios.get(
        `http://localhost:5005/api/patients/${patientId}/prescriptions`
      );
      if (response.data.length > 0) {
        setPrescriptions(response.data);
      } else {
        // Initialize with an empty prescription if none exist
        setPrescriptions([{ medicine: '', morning: 'No', day: 'No', night: 'No' }]);
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  const handlePatientChange = (e) => {
    const patientId = e.target.value;
    setSelectedPatientId(patientId);
    if (patientId) {
      fetchPrescriptions(patientId);
    } else {
      setPrescriptions([]);
    }
  };

  const handlePrescriptionChange = (index, field, value) => {
    const newPrescriptions = [...prescriptions];
    newPrescriptions[index][field] = value;
    setPrescriptions(newPrescriptions);
  };

  const addPrescriptionRow = () => {
    setPrescriptions([
      ...prescriptions,
      { medicine: '', morning: 'No', day: 'No', night: 'No' },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatientId) {
      alert('Please select a patient.');
      return;
    }

    try {
      await axios.post('http://localhost:5005/api/prescriptions', {
        patientId: selectedPatientId,
        prescriptions,
      });
      alert('Prescriptions saved successfully.');
      // Fetch updated prescriptions
      fetchPrescriptions(selectedPatientId);
    } catch (error) {
      console.error('Error saving prescriptions:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Doctor Portal</h2>
      <form onSubmit={handleSubmit}>
        {/* Patient Selection */}
        <div className="mb-3">
          <label htmlFor="patientSelect" className="form-label">
            Select Patient:
          </label>
          <select
            id="patientSelect"
            className="form-select"
            value={selectedPatientId}
            onChange={handlePatientChange}
          >
            <option value="">-- Select a Patient --</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name} (ID: {patient.id})
              </option>
            ))}
          </select>
        </div>

        {/* Prescriptions Table */}
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
                <td>
                  <select
                    className="form-select"
                    value={prescription.medicine}
                    onChange={(e) =>
                      handlePrescriptionChange(index, 'medicine', e.target.value)
                    }
                  >
                    <option value="">-- Select Medicine --</option>
                    {medicines.map((medicine, idx) => (
                      <option key={idx} value={medicine}>
                        {medicine}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    className="form-select"
                    value={prescription.morning}
                    onChange={(e) =>
                      handlePrescriptionChange(index, 'morning', e.target.value)
                    }
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
                <td>
                  <select
                    className="form-select"
                    value={prescription.day}
                    onChange={(e) =>
                      handlePrescriptionChange(index, 'day', e.target.value)
                    }
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
                <td>
                  <select
                    className="form-select"
                    value={prescription.night}
                    onChange={(e) =>
                      handlePrescriptionChange(index, 'night', e.target.value)
                    }
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Medicine Button */}
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={addPrescriptionRow}
          >
            Add Medicine +
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Save Prescriptions
        </button>
      </form>
    </div>
  );
}

export default DoctorPage;
