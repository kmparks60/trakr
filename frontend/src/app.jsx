import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Timeboard from './components/Timeboard';
import Test from './components/Test';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Register from "./components/Register";
import NavBar from "./components/NavBar";

function App() {
    return (
        <div className="App">
            <NavBar />
            <div className="container mx-auto px-4 py-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/timeboard" element={<Timeboard />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;