import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-6">
          Welcome to Finai 💸
        </h1>

        <p className="text-gray-700 text-lg md:text-xl mb-8 leading-relaxed">
          Finai is your personal finance companion powered by smart AI.
          <br />
          It helps you track your income, expenses, and savings goals — while giving you monthly budgeting insights and suggestions.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-medium shadow-md transition"
          >
            Register
          </button>

          <button
            onClick={() => navigate("/login")}
            className="bg-white border border-blue-600 text-blue-700 px-6 py-3 rounded-xl text-lg font-medium shadow-md hover:bg-blue-50 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
