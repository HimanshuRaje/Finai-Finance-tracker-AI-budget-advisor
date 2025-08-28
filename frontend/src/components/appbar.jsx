import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

export const AppBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState("User");
  const navigate = useNavigate();

useEffect(() => {
  axios
    .get("http://localhost:4000/api/v1/auth/username", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      setUserName(response.data.firstName); 
    })
    .catch((error) => {
      console.error("Failed to fetch user info:", error);
    });
}, []);



  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md shadow-blue-100 mb-5 px-6 py-3 flex items-center justify-between rounded-b-2xl">
      
      <h1 className="text-2xl font-bold text-blue-600 tracking-wide">
        Finai 💸
      </h1>

      {/* User Info */}
      <div className="relative">
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-xl transition-all"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <span className="text-gray-700 font-medium">{userName}</span>
          <FaUserCircle size={24} className="text-blue-500" />
        </div>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
            <button
              onClick={() => navigate("/profile")}
              className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 text-gray-800"
            >
              ✏️ Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
