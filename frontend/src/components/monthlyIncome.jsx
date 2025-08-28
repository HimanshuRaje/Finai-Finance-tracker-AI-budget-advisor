// components/MonthlyIncomePrompt.jsx
import { useState } from "react";
import axios from "axios";

export default function MonthlyIncomePrompt({ onClose, onSuccess }) {
  const [income, setIncome] = useState("");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/auth/income",
        { monthlyIncome: income },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onSuccess(); // notify parent
      onClose();   // close modal
    } catch (err) {
      console.error(err);
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

        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
}
