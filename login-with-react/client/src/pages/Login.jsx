import React, { useState } from "react";
import axios from "axios";
import { handleError } from "../utils/handleError";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;

const defaultValues = {
  email: "",
  password: "",
};

export default function Login() {
  const [loginInput, setLoginInput] = useState(defaultValues);
  const navigate = useNavigate();

  //form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/user/login", {
        email: loginInput.email,
        password: loginInput.password,
      });
      navigate("/");
      toast.success("Logged in Successfully!");
    } catch (error) {
      handleError(error);
    }
  };

  //handle on change event function
  const handleOnChange = (e) => {
    setLoginInput((prevVal) => ({
      ...prevVal,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="__login w-full h-[calc(100dvh-60px)] bg-slate-800 text-white flex justify-center items-center flex-col gap-3">
      <h1 className="text-3xl">Login Page</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="text-black outline-none p-2 rounded"
          type="email"
          placeholder="Email"
          required
          name="email"
          value={loginInput.email}
          onChange={handleOnChange}
        />
        <input
          className="text-black outline-none p-2 rounded"
          type="password"
          placeholder="Password"
          required
          name="password"
          value={loginInput.password}
          onChange={handleOnChange}
        />
        <button className="primary-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
