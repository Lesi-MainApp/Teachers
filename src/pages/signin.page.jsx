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
        navigate(
          `/otp?flow=signup&phone=${encodeURIComponent(form.whatsappnumber)}`
        );
        return;
      }

      setError(msg);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col md:flex-row">
      <div className="hidden w-full md:flex md:w-1/2">
        <img
          src={signimage}
          alt="Sign in illustration"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex w-full flex-col items-center justify-center bg-white p-10 md:w-1/2">
        <h2 className="mb-6 text-3xl font-bold text-blue-800">Teachers</h2>

        {error && (
          <div className="mb-4 w-full max-w-sm rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form className="w-full max-w-sm" onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-700">
              WhatsApp Number
            </label>
            <input
              name="whatsappnumber"
              value={form.whatsappnumber}
              onChange={onChange}
              type="tel"
              placeholder="Enter your WhatsApp number"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-1">
            <label className="mb-2 block text-sm text-gray-700">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={onChange}
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6 text-right">
            <Link
              to="/otp?flow=forgot"
              className="text-sm font-semibold text-blue-700 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 py-2 text-white transition duration-200 hover:bg-blue-700 disabled:opacity-60"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/" className="font-semibold text-blue-700 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;