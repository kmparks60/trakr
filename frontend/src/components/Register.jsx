import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, SetUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-[#001F3F]">
      <div className="w-full max-w-md p-6 mt-28 bg-[#FFFFFF] rounded-lg shadow-md max-h-[425px]">
        <h2 className="text-2xl font-semibold text-center text-[#001F3F]">Register</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleRegister} className="mt-4 space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#001F3F]">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => SetUsername(e.target.value)}
              className="w-full px-4 py-2 border border-[#FFE8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8532] text-[#001F3F]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#001F3F]">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-[#FFE8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8532] text-[#001F3F]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#001F3F]">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-[#FFE8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8532] text-[#001F3F]"
            />
          </div>
          <div className="mt-6">
            <button type="submit" className="w-full py-2 px-4 bg-[#FF8532] text-[#FFFFFF] font-semibold rounded-lg hover:bg-[#FFE8F0] hover:text-[#001F3F] focus:outline-none">
              Register
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-[#001F3F]">
            Already have an account? 
            <a href="/login" className="text-[#FF8532] hover:text-[#FFE8F0]"> Login here</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
