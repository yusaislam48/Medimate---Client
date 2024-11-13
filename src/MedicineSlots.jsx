// frontend/src/MedicineSlots.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MedicineSlots() {
  const [slots, setSlots] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [usedMedicines, setUsedMedicines] = useState(new Set());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchMedicines();
    fetchSlots();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('http://localhost:5005/api/medicines');
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  const fetchSlots = async () => {
    try {
      const response = await axios.get('http://localhost:5005/api/slots');
      setSlots(response.data);
      // Initialize used medicines
      const used = new Set();
      response.data.forEach((slot) => {
        if (slot.medicine) {
          used.add(slot.medicine);
        }
      });
      setUsedMedicines(used);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const handleMedicineChange = (slotIndex, value) => {
    const updatedSlots = [...slots];
    const prevMedicine = updatedSlots[slotIndex].medicine;

    // Remove previous medicine from usedMedicines
    if (prevMedicine) {
      usedMedicines.delete(prevMedicine);
    }

    // Set new medicine
    updatedSlots[slotIndex].medicine = value || '';

    // Add new medicine to usedMedicines
    if (value) {
      usedMedicines.add(value);
    }

    // If medicine is removed, reset stock and status
    if (!value) {
      updatedSlots[slotIndex].stock = null;
      updatedSlots[slotIndex].status = 'No Medicine Assigned';
    }

    setSlots(updatedSlots);
    setUsedMedicines(new Set(usedMedicines));
  };

  const handleStockChange = (slotIndex, value) => {
    const updatedSlots = [...slots];
    const stockValue = parseInt(value) || 0;
    updatedSlots[slotIndex].stock = stockValue;

    // Update status based on new stock
    if (stockValue <= 2) {
      updatedSlots[slotIndex].status = 'Low Stock';
    } else {
      updatedSlots[slotIndex].status = 'OK';
    }

    setSlots(updatedSlots);
  };

  const saveSlots = async () => {
    setSaving(true);
    try {
      const response = await axios.post('http://localhost:5005/api/slots', { slots });
      alert('Slots updated successfully');
      setSlots(response.data.slots);
      // Update used medicines after saving
      const used = new Set();
      response.data.slots.forEach((slot) => {
        if (slot.medicine) {
          used.add(slot.medicine);
        }
      });
      setUsedMedicines(used);
    } catch (error) {
      console.error('Error saving slots:', error);
      alert(error.response?.data?.message || 'Error saving slots');
    }
    setSaving(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Medicine Slots</h2>
      <table className="table table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Slot Number</th>
            <th>Medicine</th>
            <th>Stock</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot, index) => (
            <tr key={slot.slotNumber}>
              <td>{slot.slotNumber}</td>
              <td>
                <select
                  className="form-select"
                  value={slot.medicine}
                  onChange={(e) => handleMedicineChange(index, e.target.value)}
                >
                  <option value="">-- Select Medicine --</option>
                  {medicines.map((medicine, idx) => (
                    <option
                      key={idx}
                      value={medicine}
                      disabled={usedMedicines.has(medicine) && slot.medicine !== medicine}
                    >
                      {medicine}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                {slot.medicine ? (
                  <input
                    type="number"
                    className="form-control"
                    value={slot.stock || ''}
                    min="2"
                    max="10"
                    onChange={(e) => handleStockChange(index, e.target.value)}
                  />
                ) : (
                  <input
                    type="number"
                    className="form-control"
                    value=""
                    disabled
                    placeholder="N/A"
                  />
                )}
              </td>
              <td>
                {slot.status === 'Low Stock' ? (
                  <span className="text-danger">{slot.status}</span>
                ) : slot.status === 'OK' ? (
                  <span className="text-success">{slot.status}</span>
                ) : (
                  <span className="text-muted">{slot.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={saveSlots} disabled={saving}>
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}

export default MedicineSlots;
