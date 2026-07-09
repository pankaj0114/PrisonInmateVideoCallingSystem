import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PrisonerDashboard = () => {
  const location = useLocation();
  const { prisoner } = location.state || {};

  if (!prisoner) {
    return <p className="text-center mt-10">No prisoner data found.</p>;
  }

  const startCall = async (contact, type) => {
    try {
      const roomName = `room_${Date.now()}`; // unique room name

      // Ask backend to create Twilio room + send SMS
      const res = await axios.post('http://localhost:5000/api/start-call', {
        roomName,
        phone: contact.phone,
        type,
        prisonerId: prisoner.prisonCardNumber, // ✅ send prisoner ID
      });

      // Redirect prisoner to deployed call page (Netlify)
      window.location.href = `https://relaxed-longma-050349.netlify.app/index.html?roomName=${res.data.roomName}&type=${type}`;
    } catch (error) {
      console.error('❌ Call initiation failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold">Welcome {prisoner.name}</h1>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={prisoner.photoUrl}
            alt="Prisoner"
            className="w-20 h-20 rounded-full border"
          />
          <p>
            <strong>ID Proof:</strong> {prisoner.idProofType}
          </p>
          <p>
            <strong>Card Number:</strong> {prisoner.prisonCardNumber}
          </p>
          <p>
            <strong>Admission Date:</strong>{' '}
            {new Date(prisoner.admissionDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Balance:</strong> ₹{prisoner.balance}
          </p>
        </div>

        <h2 className="text-lg font-semibold mt-6">Family Members</h2>
        {prisoner.emergencyContacts?.map((contact, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm mt-3"
          >
            <div>
              <p className="font-medium">{contact.name}</p>
              <p className="text-sm text-gray-600">{contact.phone}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => startCall(contact, 'audio')}
                className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
              >
                📞
              </button>
              <button
                onClick={() => startCall(contact, 'video')}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                🎥
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrisonerDashboard;
