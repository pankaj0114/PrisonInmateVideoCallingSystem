import React, { useState, useRef } from 'react';
import { supabase } from '../supabaseClient';
import api from '../axiosConfig';

const PrisonerRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    gender: '',
    age: '',
    idProofType: '',
    idNumber: '',
    admissionDate: '',
    religion: '',
    nationality: '',
    state: '',
    district: '',
    address: '',
    prisonerId: '',
    prisonCardNumber: '',
    rfid: '',
    amount: '',
    emergencyContacts: [{ name: '', phone: '' }],
    photoUrl: '',
  });
  const [file, setFile] = useState(null);
  const printRef = useRef();

  // Helper functions moved INSIDE the component
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (index, field, value) => {
    const contacts = [...formData.emergencyContacts];
    contacts[index][field] = value;
    setFormData((prev) => ({ ...prev, emergencyContacts: contacts }));
  };

  const addContact = () => {
    setFormData((prev) => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, { name: '', phone: '' }],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let photoUrl = '';
    if (file) {
      // 1. Generate a clean, unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `prisoner-${Date.now()}.${fileExt}`;

      // 2. Upload to the 'avatar' bucket under the 'prisoners' folder
      const { data, error } = await supabase.storage
        .from('avatar')
        .upload(`prisoners/${fileName}`, file, {
          upsert: true,
        });

      if (error) {
        alert('Photo upload failed: ' + error.message);
        return;
      }

      // 3. FIX: Safely retrieve the absolute public URL from Supabase
      const {
        data: { publicUrl },
      } = supabase.storage.from('avatar').getPublicUrl(`prisoners/${fileName}`); // Pass the exact path string directly

      photoUrl = publicUrl;
    }

    // ... rest of your code to post to your backend
    try {
      const response = await api.post('/admin/register-prisoner', {
        ...formData,
        photoUrl,
      });
      alert('Prisoner registered successfully!');
    } catch (err) {
      // Check if the backend sent a specific error message
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;

      alert('Registration failed: ' + errorMessage);
      console.error('Full error details:', err.response?.data);
    }
  };

  const handlePrint = () => {
    const printContents = printRef.current?.innerHTML || 'No contents to print';
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  // Return block is now legally placed inside the function
  return (
    <div className="flex flex-col items-center min-h-screen bg-linear-to-b from-gray-100 via-gray-200 to-gray-300 p-6">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Prisoner Registration
      </h1>

      {/* Added printRef target wrapper so printing actually captures the content */}
      <div ref={printRef} className="w-full max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-xl p-8 space-y-6"
        >
          {/* Basic Info */}
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Basic Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="name"
              value={formData.name}
              placeholder="Prisoner Name"
              onChange={handleChange}
              className="input"
            />
            <input
              name="fatherName"
              value={formData.fatherName}
              placeholder="Father/Husband Name"
              onChange={handleChange}
              className="input"
            />
            <input
              name="motherName"
              value={formData.motherName}
              placeholder="Mother Name"
              onChange={handleChange}
              className="input"
            />
            <input
              name="gender"
              value={formData.gender}
              placeholder="Gender"
              onChange={handleChange}
              className="input"
            />
            <input
              name="age"
              value={formData.age}
              placeholder="Age"
              onChange={handleChange}
              className="input"
            />
            <input
              type="date"
              name="admissionDate"
              value={formData.admissionDate}
              onChange={handleChange}
              className="input"
              required
              max={new Date().toISOString().split('T')[0]} // prevents future dates
            />
          </div>

          {/* Identification */}
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Identification
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="idProofType"
              value={formData.idProofType}
              placeholder="ID Proof Type"
              onChange={handleChange}
              className="input"
            />
            <input
              name="idNumber"
              value={formData.idNumber}
              placeholder="ID Number"
              onChange={handleChange}
              className="input"
            />
            <input
              name="prisonerId"
              value={formData.prisonerId}
              placeholder="Prisoner ID"
              onChange={handleChange}
              className="input"
            />
            <input
              name="prisonCardNumber"
              value={formData.prisonCardNumber}
              placeholder=" Prison Card Number (16 digits)"
              onChange={handleChange}
              className="input"
              pattern="\d{16}"
              title="Must be exactly 16 digits"
            />
            <input
              name="rfid"
              value={formData.rfid}
              placeholder="RFID"
              onChange={handleChange}
              className="input"
            />
            <input
              name="amount"
              value={formData.amount}
              placeholder="Amount"
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Additional Info */}
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Additional Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="religion"
              value={formData.religion}
              placeholder="Religion"
              onChange={handleChange}
              className="input"
            />
            <input
              name="nationality"
              value={formData.nationality}
              placeholder="Nationality"
              onChange={handleChange}
              className="input"
            />
            <input
              name="state"
              value={formData.state}
              placeholder="State"
              onChange={handleChange}
              className="input"
            />
            <input
              name="district"
              value={formData.district}
              placeholder="District"
              onChange={handleChange}
              className="input"
            />
          </div>
          <textarea
            name="address"
            value={formData.address}
            placeholder="Address"
            onChange={handleChange}
            className="input w-full"
          />

          {/* Emergency Contacts */}
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Emergency Contacts
          </h2>
          {formData.emergencyContacts.map((contact, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                placeholder="Contact Name"
                value={contact.name}
                onChange={(e) =>
                  handleContactChange(index, 'name', e.target.value)
                }
                className="input flex-1"
              />
              <input
                placeholder="Phone Number"
                value={contact.phone}
                onChange={(e) =>
                  handleContactChange(index, 'phone', e.target.value)
                }
                className="input flex-1"
              />
            </div>
          ))}
          <button type="button" onClick={addContact} className="btn-secondary">
            + Add Contact
          </button>

          {/* Photo */}
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Prisoner Photo
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {/* Actions */}
          <div className="flex space-x-4 mt-6">
            <button type="submit" className="btn-primary">
              Save
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="btn-secondary"
            >
              Print Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrisonerRegistration;
