import React, { useState } from 'react';
import { FaUserCog, FaUserPlus, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddRecords = () => {
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState('');
  const [prisoner, setPrisoner] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      setError('');
      const token = localStorage.getItem('token'); // JWT from login
      const res = await axios.get(
        `http://localhost:5000/api/admin/prisoner/${searchId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setPrisoner(res.data);
    } catch (err) {
      setPrisoner(null);
      setError(err.response?.data?.message || 'Search failed');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-100 via-gray-200 to-gray-300 p-6">
      {/* Title */}
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6">
        Add New Records
      </h1>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter Prisoner ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FaSearch /> Search
        </button>
      </div>

      {/* Search Result */}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {prisoner && (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-lg font-bold text-gray-800">Prisoner Details</h2>
          <p>
            <strong>Name:</strong> {prisoner.name}
          </p>
          <p>
            <strong>Prisoner ID:</strong> {prisoner.prisonerId}
          </p>
          <p>
            <strong>Cell:</strong> {prisoner.cellNumber}
          </p>
          <p>
            <strong>Balance:</strong> ₹{prisoner.balance}
          </p>
        </div>
      )}

      {/* Options */}
      <div className="flex gap-10 mt-8">
        {/* Add Admin */}
        <div
          onClick={() => navigate('/add-admin')}
          className="bg-white shadow-xl rounded-xl p-6 w-60 text-center transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
        >
          <FaUserCog className="text-blue-600 text-5xl mx-auto mb-3" />
          <h4 className="text-lg font-bold text-gray-800">Add Admin</h4>
          <p className="text-sm text-gray-500 mb-4">Create new admin account</p>
        </div>

        {/* Add Prisoner */}
        <div
          onClick={() => navigate('/add-prisoner')}
          className="bg-white shadow-xl rounded-xl p-6 w-60 text-center transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
        >
          <FaUserPlus className="text-green-600 text-5xl mx-auto mb-3" />
          <h4 className="text-lg font-bold text-gray-800">Add Prisoner</h4>
          <p className="text-sm text-gray-500 mb-4">Register new prisoner</p>
        </div>
      </div>
    </div>
  );
};

export default AddRecords;
