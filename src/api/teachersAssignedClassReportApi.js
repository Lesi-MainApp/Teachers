import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export const teachersAssignedClassReportApi = createApi({
  reducerPath: "teachersAssignedClassReportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/teachers-assigned-class-report`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      try {
        const token = getState()?.auth?.token;
        if (token) headers.set("Authorization", `Bearer ${token}`);
      } catch (err) {
        console.error("teachersAssignedClassReportApi prepareHeaders error:", err);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTeachersAssignedClassReport: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["TeachersAssignedClassReport"],
    }),
  }),
});

export const { useGetTeachersAssignedClassReportQuery } =
  teachersAssignedClassReportApi;