import React from 'react'
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to the Typing Game</h1>
      <div className="mt-4">
        <Link to="/test" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Start Test</Link>
        <Link to="/leaderboard" className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg">Leaderboard</Link>
      </div>
    </div>
    </>
  )
}

export default Home
