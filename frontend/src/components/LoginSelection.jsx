import React from 'react';
import { useNavigate } from 'react-router-dom';
import jailLogo from '../assets/logos/chhattisgarh-jail.png';
import { FaUserCog, FaUser } from 'react-icons/fa';

const LoginSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen bg-linear-to-b from-gray-100 via-gray-200 to-gray-300 p-6">
      {/* Logo */}
      <img
        src={jailLogo}
        alt="Chhattisgarh Jail Logo"
        className="w-36 h-auto mb-6 object-contain drop-shadow-lg"
      />

      {/* Title */}
      <h1 className="text-2xl font-extrabold text-gray-800 tracking-wide">
        सत्यमेव जयते
      </h1>
      <h2 className="text-xl text-gray-700 mb-6 font-semibold">
        छत्तीसगढ़ जेल
      </h2>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Select Login Type
      </h3>

      {/* Options */}
      <div className="flex gap-10 mt-8">
        {/* Admin Login */}
        <div className="bg-white shadow-xl rounded-xl p-6 w-60 text-center transform hover:scale-105 transition duration-300 ease-in-out">
          <FaUserCog className="text-blue-600 text-5xl mx-auto mb-3" />
          <h4 className="text-lg font-bold text-gray-800">Admin Login</h4>
          <p className="text-sm text-gray-500 mb-4">
            Access administrative features
          </p>
          <button
            onClick={() => navigate('/admin-login')}
            className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition"
          >
            Login
          </button>
        </div>

        {/* Prisoner Login */}
        <div className="bg-white shadow-xl rounded-xl p-6 w-60 text-center transform hover:scale-105 transition duration-300 ease-in-out">
          <FaUser className="text-gray-800 text-5xl mx-auto mb-3" />
          <h4 className="text-lg font-bold text-gray-800">Prisoner Login</h4>
          <p className="text-sm text-gray-500 mb-4">View your information</p>
          <button
            onClick={() => navigate('/prisoner-login')}
            className="w-full bg-linear-to-r from-gray-800 to-black text-white py-2 rounded-lg font-semibold hover:from-black hover:to-gray-900 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSelection;
