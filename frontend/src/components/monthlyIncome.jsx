// components/MonthlyIncomePrompt.jsx
import { useState } from "react";
import axios from "axios";

export default function MonthlyIncomePrompt({ onClose, onSuccess }) {
  const [income, setIncome] = useState("");
  const [balance, setBalance] = useState("");
  const [savings, setSavings] = useState("");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:4000/api/v1/auth/income",
        { monthlyIncome: income, currentBalance: balance, savingsGoal: savings },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error saving income");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-900 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-xl font-bold ">
            Enter Your Monthly Income
          </h1>
          <p className="text-l font-semibold mb-2">
            Must insert certain amount
          </p>
          <p className="text-l font mb-4">
            (negative amount will be considered as positive)
          </p>
        </div>

        {/* Balance */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Current Balance
        </label>
        <input
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          placeholder="e.g. 23000"
          className="w-full p-2 border rounded-lg mb-4"
          min={0}
        />
        
        {/* Income */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Monthly Income
        </label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="e.g. 50000"
          className="w-full p-2 border rounded-lg mb-4"
          min={0}
        />

        {/* Savings */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Savings Goal
        </label>
        <input
          type="number"
          value={savings}
          onChange={(e) => setSavings(e.target.value)}
          placeholder="e.g. 10000"
          className="w-full p-2 border rounded-lg mb-4"
          min={0}
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
