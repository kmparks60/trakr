import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	useEffect(() => {
		const token = localStorage.getItem('token');
	}, [token]);

	const handleLogout = () => {
		localStorage.removeItem('token');
    	navigate('/');
	};

	return (
		<nav className="bg-[#001F3F] text-white shadow-md py-4 px-8 flex justify-between items-center border-b-4 border-[#FFE8F0]">
			<div className="flex space-x-6">
				<button 
					className="bg-[#FF8532] text-[#FFFFFF] py-2 px-6 rounded-md text-sm font-sans uppercase tracking-wider hover:bg-[#FFE8F0] hover:text-[#001F3F] focus:outline-none transform hover:scale-105 transition-all duration-300"
					onClick={() => navigate('/')}
				>
					Home
				</button>
				<button 
					className="bg-[#FF8532] text-[#FFFFFF] py-2 px-6 rounded-md text-sm font-sans uppercase tracking-wider hover:bg-[#FFE8F0] hover:text-[#001F3F] focus:outline-none transform hover:scale-105 transition-all duration-300"
					onClick={() => navigate('/timeboard')}
				>
					Leaderboard
				</button>
			</div>

			<div className="flex-grow text-center">
				<Link to="/" className="text-2xl font-semibold text-white">
					<img 
					src="https://64.media.tumblr.com/0148460d14734cf35d3d9f6cc9877e12/1786fc6644ea9e29-68/s540x810/a16a0bc3f979c04df9e3315b259e52632588d5d8.pnj" 
					alt="Trakr Logo" 
					className="md:h-18 mb-4 mx-auto" 
					/>
				</Link>
			</div>

			<div className="space-x-4 flex items-center">
				{!token ? (
					<>
					<button 
						className="bg-[#FF8532] text-[#FFFFFF] py-2 px-6 rounded-md text-sm font-sans uppercase tracking-wider hover:bg-[#FFE8F0] hover:text-[#001F3F] focus:outline-none transform hover:scale-105 transition-all duration-300"
						onClick={() => navigate('/register')}
					>
						Sign Up
					</button>
					<button 
						className="bg-[#FF8532] text-[#FFFFFF] py-2 px-6 rounded-md text-sm font-sans uppercase tracking-wider hover:bg-[#FFE8F0] hover:text-[#001F3F] focus:outline-none transform hover:scale-105 transition-all duration-300"
						onClick={() => navigate('/login')}
					>
						Login
					</button>
					</>
				) : (
					<button 
					onClick={handleLogout} 
					className="bg-[#FF8532] text-[#FFFFFF] py-2 px-6 rounded-md text-sm font-sans uppercase tracking-wider hover:bg-[#FFE8F0] hover:text-[#001F3F] focus:outline-none transform hover:scale-105 transition-all duration-300"
					>
					Logout
					</button>
				)}
			</div>
		</nav>
	);
}

export default NavBar;
