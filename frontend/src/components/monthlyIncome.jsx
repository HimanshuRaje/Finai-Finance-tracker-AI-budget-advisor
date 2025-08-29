// components/MonthlyIncomePrompt.jsx
import { useState } from "react";
import axios from "axios";

export default function MonthlyIncomePrompt({ onClose, onSuccess }) {
  const [income, setIncome] = useState("");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put("http://localhost:4000/api/v1/auth/income",
        {monthlyIncome: income},
        {
          headers: {
          Authorization : `Bearer ${token}`
          }
        }
      );

      onSuccess(); // notify parent (e.g. redirect)
      onClose();   // close modal
    } catch (error) {
      console.error(error);
      alert("Error saving income");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Enter Your Monthly Income</h2>

        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="e.g. 50000"
          className="w-full p-2 border rounded-lg mb-4"
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
