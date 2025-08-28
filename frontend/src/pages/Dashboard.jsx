import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar } from '../components/appbar';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-10">
      <AppBar/>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Financial Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-xl shadow-md">
          <p className="text-sm text-gray-500">Total Income</p>
          <h2 className="text-2xl font-semibold text-green-700">₹ 0</h2>
        </div>
        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-xl shadow-md">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <h2 className="text-2xl font-semibold text-red-700">₹ 0</h2>
        </div>
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-xl shadow-md">
          <p className="text-sm text-gray-500">Current Balance</p>
          <h2 className="text-2xl font-semibold text-blue-700">₹ 0</h2>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200 text-center text-gray-400">
        📊 Chart will appear here
      </div>

      {/* Summary Cards Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow border text-gray-600 text-center">
          📌 Recent Transactions Summary
        </div>
        <div className="bg-white p-4 rounded-xl shadow border text-gray-600 text-center">
          🎯 Goal Progress Overview
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
