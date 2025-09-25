import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MonthlySummaryCards() {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/api/v1/account/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Sort by month descending
        const sorted = res.data.sort((a, b) => (b.month > a.month ? 1 : -1));
        setSummaries(sorted);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching summaries:", err);
        setLoading(false);
      }
    };
    fetchSummaries();
  }, []);

  if (loading) return <p>Loading monthly summaries...</p>;
  if (summaries.length === 0) return <p>No monthly summaries yet.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {summaries.map((summary) => (
        <div key={summary._id} className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">{summary.month}</h3>
          <p><span className="font-medium">Total Expenses:</span> ₹{Object.values(summary.expenses).reduce((a,b)=>a+b,0)}</p>

          <div className="mt-2">
            <h4 className="font-medium mb-1">Expense Breakdown:</h4>
            {Object.entries(summary.expenses).map(([category, amount]) => (
              <p key={category}>
                {category}: ₹{amount}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
