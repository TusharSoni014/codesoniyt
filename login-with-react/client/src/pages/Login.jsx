import React, { useState } from "react";

const defaultValues = {
  email: "",
  password: "",
};

export default function Login() {
  const [loginInput, setLoginInput] = useState(defaultValues);

  //form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (error) {}
  };

  //handle on change event function
  const handleOnChange = (e) => {
    setLoginInput((prevVal) => ({
      ...prevVal,
      [e.target.name]: e.target.value,
    }));
    console.log(loginInput);
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
