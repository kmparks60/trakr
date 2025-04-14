import React, { useEffect, useState } from "react";

const Timeboard = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to view results.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/results", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setResults(data.length ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Timeboard</h2>

      {loading && <p>Loading results...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && results.length === 0 && <p>No results found.</p>}

      {!loading && !error && results.length > 0 && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Username</th>
              <th className="border p-2">WPM</th>
              <th className="border p-2">Accuracy</th>
              <th className="border p-2">Test Duration</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} className="border">
                <td className="border p-2">{result.username}</td>
                <td className="border p-2">{result.wpm}</td>
                <td className="border p-2">{result.accuracy}%</td>
                <td className="border p-2">{result.test_duration} min</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Timeboard;
