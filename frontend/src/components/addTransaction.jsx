import { useState } from "react";
import axios from "axios";

export default function AddTransaction() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    month: "2025-09", // default current month
    income: "",
    expenses: {
      Food: "",
      Travel: "",
      Shopping: "",
    },
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["Food", "Travel", "Shopping"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        expenses: { ...prev.expenses, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // JWT stored after login
      const res = await axios.post(
        "http://localhost:4000/api/v1/account/transaction",
        {
          month: formData.month,
          expenses: {
            Food: Number(formData.expenses.Food),
            Travel: Number(formData.expenses.Travel),
            Shopping: Number(formData.expenses.Shopping),
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.message);
      setShowForm(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding transaction");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-600 text-white ml-20 mr-20 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
      >
        📝 Add your Last Month's Transaction
      </button>

      {showForm && (
        
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4 bg-gray-100 p-4 rounded-lg shadow-md"
        >
            <button
            type="submit"
            className="bg-gray-600 text-white px-4 py-2 ml-75 rounded-lg shadow-md hover:bg-gray-700"
            onClick={()=>{setShowForm(false)}}
          >
            close
          </button>
          {/* ✅ Native Month Picker */}
          <p>🤔 "let's see your a month's transaction...?"</p>
          <input
            type="month"
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <p>"How much did you spent one food haa?" 😋</p>
          <input
            type="number"
            name="Food"
            value={formData.expenses.Food}
            onChange={handleChange}
            placeholder="Food Expense"
            className="w-full p-2 border rounded"
          />
          <p>"you away form home, total spendings..?" ✈️🧳</p>
          <input
            type="number"
            name="Travel"
            value={formData.expenses.Travel}
            onChange={handleChange}
            placeholder="Travel Expense"
            className="w-full p-2 border rounded"
          />
          <p>“Cart behaved… or went wild?” 💳</p>
          <input
            type="number"
            name="Shopping"
            value={formData.expenses.Shopping}
            onChange={handleChange}
            placeholder="Shopping Expense"
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="bg-green-600 text-white ml-35 px-4 py-2 rounded-lg shadow-md hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      )}

      {message && (
        <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
      )}
    </div>
  );
}
