import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";

import { store } from "./api/Store";

import SignUpPage from "./pages/signup.page";
import SignInPage from "./pages/signin.page";
import OTPPage from "./pages/OTP.page";
import ForgotPassword from "./pages/Forgotpassword";
import HomePage from "./pages/home.page";

import Studentspage from "./pages/students.page";
import PaperReport from "./pages/paper.Report";
import ClassReport from "./pages/Class.Report.page";
import Result from "./pages/Result.page";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* AUTH */}
          <Route path="/" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />

          {/* OTP page handles both signup + forgot */}
          <Route path="/otp" element={<OTPPage />} />

          {/* Reset password page */}
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          {/* APP */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/student" element={<Studentspage />} />
          <Route path="/paper" element={<PaperReport />} />
          <Route path="/class" element={<ClassReport />} />
          <Route path="/result" element={<Result />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
