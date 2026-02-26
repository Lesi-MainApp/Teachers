import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signimage from "../assets/signimage.png";
import { useSignUpMutation } from "../api/authApi";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();

  const [form, setForm] = useState({
    name: "",
    whatsappnumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "teacher",
  });

  const [error, setError] = useState("");

  const onChange = (e) => {
    setError("");
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (String(form.password) !== String(form.confirmPassword)) {
      setError("Passwords do not match");
      return;
    }

    try {
      const payload = {
        name: form.name.trim(),
        whatsappnumber: form.whatsappnumber.trim(),
        email: form.email.trim(),
        password: form.password,
        role: "teacher",
      };

      const res = await signUp(payload).unwrap();
      const phone = res?.user?.phonenumber || form.whatsappnumber;

      navigate(`/otp?flow=signup&phone=${encodeURIComponent(phone)}`);
    } catch (err) {
      setError(err?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex h-screen w-full flex-col md:flex-row">
      <div className="hidden w-full md:flex md:w-1/2">
        <img
          src={signimage}
          alt="Sign up illustration"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex w-full flex-col items-center justify-center bg-white p-10 md:w-1/2">
        <h2 className="mb-2 text-3xl font-bold text-blue-800">Teachers</h2>
        <p className="mb-8 text-sm text-gray-500">Create your teacher account</p>

        {error && (
          <div className="mb-4 w-full max-w-sm rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form className="w-full max-w-sm" onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-700">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

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

          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-700">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
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

          <div className="mb-6">
            <label className="mb-2 block text-sm text-gray-700">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChange}
              type="password"
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 py-2 text-white transition duration-200 hover:bg-blue-700 disabled:opacity-60"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Have an account?{" "}
            <Link
              to="/signin"
              className="font-semibold text-blue-700 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;