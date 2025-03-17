import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Timeboard from './components/Timeboard';
import Test from './components/Test';

function App() {
    return(
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/timeboard" element={<Timeboard />} />
                    <Route path="/test" element={<Test />} />
                </Routes>
            </Router>
        </>
    )
}

export default App;