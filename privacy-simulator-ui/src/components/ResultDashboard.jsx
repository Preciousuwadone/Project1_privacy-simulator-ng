import React from 'react';
import { useLocation } from 'react-router-dom';

export default function ResultDashboard() {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) return <p>No result available</p>;

  return (
    <div>
      <h2>Your Risk Score</h2>
      <p>Score: {result.score}</p>
      <p>Risk Level: {result.riskLevel}</p>
      {result.message && <p>{result.message}</p>}
    </div>
  );
}
