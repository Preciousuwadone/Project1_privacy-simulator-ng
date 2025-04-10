import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getUserHistory } from "../services/api";

const RiskChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("privacy_user_id");
    getUserHistory(userId).then((data) => {
      const labels = data.map((entry) =>
        new Date(entry.submittedAt).toLocaleDateString()
      );
      const scores = data.map((entry) => entry.score);

      setChartData({
        labels,
        datasets: [
          {
            label: "Risk Score",
            data: scores,
            fill: false,
            tension: 0.4,
            borderColor: "#f87171",
            pointBackgroundColor: "#f87171"
          },
        ],
      });
    });
  }, []);

  return (
    <div>
      <h3>Your Risk Score Over Time</h3>
      {chartData ? (
        <Line data={chartData} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default RiskChart;