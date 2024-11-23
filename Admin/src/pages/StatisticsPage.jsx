import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const StatisticsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/super/admin/statistics", {
          withCredentials: true,
        });
        setStats(response.data);
      } catch (err) {
        setError("Failed to fetch statistics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return <div className="text-center text-lg font-semibold">Loading statistics...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  // Prepare data for the chart
  const chartData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Listings", value: stats.totalListings },
    { name: "Reports", value: stats.totalReports },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Admin Statistics</h1>

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#4B5563" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatisticsPage;
