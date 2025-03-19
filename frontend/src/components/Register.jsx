import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:5000/api/auth/register', { email, password });
			localStorage.setItem('token', response.data.token);
			navigate('/');
		} catch (err) {
			setError(err.response?.data?.msg || 'Registration failed');
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
				<h2 className="text-2xl font-semibold text-center text-gray-700">Register</h2>
				{error && <div className="text-red-500 text-center mb-4">{error}</div>}
				<form onSubmit={handleRegister} className="mt-4 space-y-4">
				<div>
					<label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
					<input type="email" id="email" placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
				</div>
				<div>
					<label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
					<input type="password" id="password" placeholder="Enter your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
				</div>
				<div className="mt-6">
					<button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none">
						Register
					</button>
				</div>
				</form>
				<div className="mt-4 text-center">
					<span className="text-sm text-gray-600">
						Already have an account? 
						<a href="/login" className="text-indigo-600 hover:text-indigo-700"> Login here</a>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Register;