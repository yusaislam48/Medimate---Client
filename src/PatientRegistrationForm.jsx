// frontend/src/PatientRegistrationForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

function PatientRegistrationForm() {
  const [patient, setPatient] = useState({
    name: '',
    age: '',
    address: '',
    dateOfAdmission: '',
    wardNumber: '',
    bedNumber: '',
    rfidCardNumber: '',
  });

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5005/api/patients', patient);
      alert(response.data.message);
      // Reset form
      setPatient({
        name: '',
        age: '',
        address: '',
        dateOfAdmission: '',
        wardNumber: '',
        bedNumber: '',
        rfidCardNumber: '',
      });
    } catch (error) {
      console.error('There was an error registering the patient!', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Medimate</h1>
      <h2 className="text-center mb-4">Patient Registration</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '600px' }}>
        {/* Name and Age Fields */}
        <div className="row mb-3">
          <div className="col-md-8">
            <label htmlFor="name" className="form-label">
              <strong>Name:</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={patient.name}
              onChange={handleChange}
              required
              placeholder="Enter patient's full name"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="age" className="form-label">
              <strong>Age:</strong>
            </label>
            <input
              type="number"
              className="form-control"
              id="age"
              name="age"
              value={patient.age}
              onChange={handleChange}
              required
              placeholder="Age"
            />
          </div>
        </div>

        {/* Address Field */}
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            <strong>Address:</strong>
          </label>
          <textarea
            className="form-control"
            id="address"
            name="address"
            value={patient.address}
            onChange={handleChange}
            required
            placeholder="Enter patient's address"
            rows="3"
          ></textarea>
        </div>

        {/* Date of Admission Field */}
        <div className="mb-3">
          <label htmlFor="dateOfAdmission" className="form-label">
            <strong>Date of Admission:</strong>
          </label>
          <input
            type="date"
            className="form-control"
            id="dateOfAdmission"
            name="dateOfAdmission"
            value={patient.dateOfAdmission}
            onChange={handleChange}
            required
          />
        </div>

        {/* Ward Number and Bed Number Fields */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="wardNumber" className="form-label">
              <strong>Ward Number:</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="wardNumber"
              name="wardNumber"
              value={patient.wardNumber}
              onChange={handleChange}
              required
              placeholder="Ward Number"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="bedNumber" className="form-label">
              <strong>Bed Number:</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="bedNumber"
              name="bedNumber"
              value={patient.bedNumber}
              onChange={handleChange}
              required
              placeholder="Bed Number"
            />
          </div>
        </div>

        {/* RFID Card Number Field */}
        <div className="mb-4">
          <label htmlFor="rfidCardNumber" className="form-label">
            <strong>RFID Card Number:</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="rfidCardNumber"
            name="rfidCardNumber"
            value={patient.rfidCardNumber}
            onChange={handleChange}
            required
            placeholder="Enter RFID card number"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register Patient
        </button>
      </form>
    </div>
  );
}

export default PatientRegistrationForm;
