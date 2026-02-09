import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForgotPasswordResetMutation } from "../api/authApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const phoneFromUrl = searchParams.get("phone") || "";
  const codeFromUrl = searchParams.get("code") || "";

  const [forgotPasswordReset, { isLoading }] = useForgotPasswordResetMutation();

  const [form, setForm] = useState({
    identifier: phoneFromUrl,
    code: codeFromUrl,
    newPassword: "",
    confirmPassword: "",
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
      await forgotPasswordReset(form).unwrap();
      navigate("/home"); // ✅ your flow says go home
    } catch (err) {
      setError(err?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-2">
          Reset Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter a new password
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit}>
          {/* identifier */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Phone Number
            </label>
            <input
              name="identifier"
              value={form.identifier}
              onChange={onChange}
              type="tel"
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* code */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">OTP Code</label>
            <input
              name="code"
              value={form.code}
              onChange={onChange}
              type="text"
              placeholder="Enter OTP"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* new pass */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              New Password
            </label>
            <input
              name="newPassword"
              value={form.newPassword}
              onChange={onChange}
              type="password"
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* confirm */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2">
              Confirm New Password
            </label>
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChange}
              type="password"
              placeholder="Confirm new password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold disabled:opacity-60"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
