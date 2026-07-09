// src/components/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jailLogo from '../assets/logos/chhattisgarh-jail.png';
import axios from 'axios';
import api from '../axiosConfig';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // use api instead of axios
      const res = await api.post('/admin/login', {
        email,
        password,
      });

      // save token
      localStorage.setItem('token', res.data.token);

      alert('Login successful!');
      navigate('/add-records');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

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
        छत्तीसगढ़ जेल
      </h1>
      <h2 className="text-lg text-gray-700 mb-6 font-semibold">Admin Login</h2>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-xl p-8 w-80 text-center"
      >
        <div className="mb-4 text-left">
          <label className="block text-gray-700 font-semibold mb-2">
            Admin ID
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Admin Email"
            required
          />
        </div>

        <div className="mb-6 text-left">
          <label className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition"
        >
          Login
        </button>

        <p
          onClick={() => navigate('/')}
          className="mt-4 text-sm text-blue-600 hover:underline cursor-pointer"
        >
          Back to Selection
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
