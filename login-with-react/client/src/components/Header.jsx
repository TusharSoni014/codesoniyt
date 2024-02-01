import React from "react";
import { useNavigate } from "react-router-dom";
import { handleError } from "../utils/handleError";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/user/logout");
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <nav className="h-[60px] flex w-full bg-slate-900 text-white p-3 justify-between items-center">
      <h2
        onClick={() => navigate("/")}
        className="font-bold text-xl cursor-pointer select-none"
      >
        React Login
      </h2>
      <ul className="flex gap-1">
        <li>
          <button onClick={() => navigate("/login")} className="primary-btn">
            Login
          </button>
        </li>
        <li>
          <button onClick={() => navigate("/signup")} className="primary-btn">
            Signup
          </button>
        </li>
        <li>
          <button onClick={handleLogout} className="danger-btn">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
