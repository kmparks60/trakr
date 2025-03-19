import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const [username, setUsername] = useState('');

	const getUserIdFromToken = () => {
		if (token) {
			try {
				const tokenParts = token.split('.');
				if (tokenParts.length === 3) {
					const decoded = JSON.parse(atob(tokenParts[1]));
					return decoded.userId || null;
				}
			} catch (error){
				console.error("Error decoding token: ", error)
			}
		}
		return null;
	};

	useEffect(() => {
		const userId = getUserIdFromToken();
		if (userId) {
			axios.get(`http://localhost:5000/api/users/${userId}`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
				.then(response => {
					console.log(response.data);
					setUsername(response.data.username);
				})
				.catch(error => {
					console.error("Error fetching username:", error);
				});
		}
	}, [token]);

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/');
	};

	return (
		<nav className="bg-indigo-600 text-white shadow-md py-4 px-6 flex justify-between items-center">
			<div className="relative group">
				<button className="text-white hover:text-indigo-200 focus:outline-none">
					<span className="font-semibold">Menu</span>
				</button>
				<div className="absolute left-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:block">
					<Link to="/" className="block px-4 py-2 hover:bg-indigo-100">Home</Link>
					<Link to="/test" className="block px-4 py-2 hover:bg-indigo-100">Test</Link>
					<Link to="/timeboard" className="block px-4 py-2 hover:bg-indigo-100">Timeboard</Link>
				</div>
			</div>

			<div className="flex-grow text-center">
				{!token ? (
				<Link to="/" className="text-2xl font-semibold text-white">Trakr</Link>
				) : (
				<span className="text-xl font-semibold">Welcome, {username}</span>
				)}
			</div>

			<div className="space-x-4">
				{!token ? (
				<>
					<Link to="/login" className="hover:text-indigo-200">Login</Link>
					<Link to="/register" className="hover:text-indigo-200">Register</Link>
				</>
				) : (
				<button
					onClick={handleLogout}
					className="hover:text-indigo-200"
				>
					Logout
				</button>
				)}
			</div>
		</nav>
	);
};

export default NavBar;