import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/appbar";
import axios from "axios";
import AddTransaction from "../components/addTransaction";
import MonthlySummaryCards from "../components/monthlySummaryCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [monthlyIncome, setMonthlyIncome] = useState("0");
  const [savings, setMonthlySavings] = useState("0");
  const [balance, setMonthlyBalance] = useState("0");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    const handleMonthlyIncome = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/account/income",
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ send token properly
            },
          }
        );

        setMonthlyIncome(response.data.income);
        setMonthlySavings(response.data.savings);
        setMonthlyBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching monthly income:", error);
      }
    };

    handleMonthlyIncome();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-10">
      {/* Top Navigation */}
      <AppBar />

      {/* Dashboard Title */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center tracking-tight">
        Your Financial Dashboard
      </h1>

      {/* Income / Savings / Balance Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Total Monthly Income</p>
          <h2 className="text-3xl font-bold text-green-700 mt-2">
            ₹ {monthlyIncome}
          </h2>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Savings Goal</p>
          <h2 className="text-3xl font-bold text-yellow-700 mt-2">₹ {savings}</h2>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Current Balance</p>
          <h2 className="text-3xl font-bold text-blue-700 mt-2">₹ {balance}</h2>
        </div>
      </section>

      {/* Add Transaction */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          ➕ Add New Transaction
        </h2>
        <AddTransaction />
      </section>

      {/* Two Column Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Monthly Summaries */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            📅 Monthly Summaries
          </h2>
          <MonthlySummaryCards />
        </div>

        {/* Right: Chart Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            📊 Spending Insights
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-md border text-gray-500 flex items-center justify-center h-80">
            📊 Chart will appear here
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
