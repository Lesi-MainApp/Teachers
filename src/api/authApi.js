import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/auth`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // SIGNUP
    signUp: builder.mutation({
      query: (payload) => ({
        url: "/signup",
        method: "POST",
        body: payload,
      }),
    }),

    // SIGNIN
    signIn: builder.mutation({
      query: (payload) => ({
        url: "/signin",
        method: "POST",
        body: payload,
      }),
    }),

    // SIGNOUT
    signOut: builder.mutation({
      query: () => ({
        url: "/signout",
        method: "POST",
      }),
    }),

    // SIGNUP OTP VERIFY
    verifyPhoneOtp: builder.mutation({
      query: (payload) => ({
        url: "/whatsapp/verify-code",
        method: "POST",
        body: payload, // { phonenumber, code }
      }),
    }),

    // SIGNUP OTP RESEND
    resendVerifyOtp: builder.mutation({
      query: (payload) => ({
        url: "/whatsapp/send-code",
        method: "POST",
        body: payload, // { phonenumber }
      }),
    }),

    // FORGOT PASSWORD: SEND OTP
    forgotPasswordSendOtp: builder.mutation({
      query: (payload) => ({
        url: "/forgot-password/send-otp",
        method: "POST",
        body: payload, // { identifier }
      }),
    }),

    // FORGOT PASSWORD: RESET (includes OTP verification)
    forgotPasswordReset: builder.mutation({
      query: (payload) => ({
        url: "/forgot-password/reset",
        method: "POST",
        body: payload, // { identifier, code, newPassword, confirmPassword }
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useVerifyPhoneOtpMutation,
  useResendVerifyOtpMutation,
  useForgotPasswordSendOtpMutation,
  useForgotPasswordResetMutation,
} = authApi;
