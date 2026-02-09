import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signimage from "../assets/signimage.png";

import { useDispatch } from "react-redux";
import { useSignInMutation } from "../api/authApi";
import { setCredentials } from "../api/features/authSlice";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signIn, { isLoading }] = useSignInMutation();

  const [form, setForm] = useState({
    whatsappnumber: "",
    password: "",
  });

  const [error, setError] = useState("");

  const onChange = (e) => {
    setError("");
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await signIn(form).unwrap();
      dispatch(setCredentials({ token: res?.token, user: res?.user }));
      navigate("/home");
    } catch (err) {
      const msg = err?.data?.message || "Sign in failed";

      if (msg.toLowerCase().includes("not verified")) {
        navigate(`/otp?flow=signup&phone=${encodeURIComponent(form.whatsappnumber)}`);
        return;
      }

      setError(msg);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      <div className="hidden md:flex w-full md:w-1/2">
        <img
          src={signimage}
          alt="Sign in illustration"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-center items-center bg-white w-full md:w-1/2 p-10">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Admin Panel</h2>

        {error && (
          <div className="w-full max-w-sm mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form className="w-full max-w-sm" onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              WhatsApp Number
            </label>
            <input
              name="whatsappnumber"
              value={form.whatsappnumber}
              onChange={onChange}
              type="tel"
              placeholder="Enter your WhatsApp number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-1">
            <label className="block text-gray-700 text-sm mb-2">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={onChange}
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="text-right mb-6">
            <Link
              to="/otp?flow=forgot"
              className="text-sm text-blue-700 font-semibold hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-60"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Don’t have an account?{" "}
            <Link to="/" className="text-blue-700 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
