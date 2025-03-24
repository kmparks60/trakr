import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [results, setResults] = useState([]);
  const [sortBy, setSortBy] = useState('wpm');
  const [filter, setFilter] = useState('');
  
  const fetchResults = async () => {
    try {
      const response = await fetch('/api/testResults');
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const sortResults = (results, sortBy) => {
    return results.sort((a, b) => {
      if (sortBy === 'wpm') {
        return b.wpm - a.wpm; 
      } else if (sortBy === 'duration') {
        return b.duration - a.duration; 
      } else if (sortBy === 'accuracy') {
        return b.accuracy - a.accuracy; 
      }
      return 0;
    });
  };

  const filteredResults = results.filter((result) => {
    return result.username.toLowerCase().includes(filter.toLowerCase()) || 
           result.wpm.toString().includes(filter);
  });

  const sortedResults = sortResults(filteredResults, sortBy);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-[#001F3F]">Leaderboard</h1>
      <p className="text-[#FF8532] mt-2">See the top scores!</p>

      <div className="mt-4 w-full max-w-md">
        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Search by username or WPM"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <select
          className="p-2 mt-2 border rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="wpm">WPM</option>
          <option value="duration">Duration</option>
          <option value="accuracy">Accuracy</option>
        </select>

        <div className="mt-4">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#001F3F] text-white">
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">WPM</th>
                <th className="px-4 py-2">Duration (sec)</th>
                <th className="px-4 py-2">Accuracy (%)</th>
              </tr>
            </thead>
            <tbody>
              {sortedResults.map((result) => (
                <tr key={result.id} className="hover:bg-[#FFE8F0]">
                  <td className="px-4 py-2">{result.username}</td>
                  <td className="px-4 py-2">{result.wpm}</td>
                  <td className="px-4 py-2">{result.duration}</td>
                  <td className="px-4 py-2">{result.accuracy.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
