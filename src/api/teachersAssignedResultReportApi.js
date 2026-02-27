import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export const teachersAssignedResultReportApi = createApi({
  reducerPath: "teachersAssignedResultReportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/teachers-assigned-result-report`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      try {
        const token = getState()?.auth?.token;
        if (token) headers.set("Authorization", `Bearer ${token}`);
      } catch (err) {
        console.error("teachersAssignedResultReportApi prepareHeaders error:", err);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTeachersAssignedResultReport: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();

        if (params.paperType) search.set("paperType", params.paperType);
        if (params.subject) search.set("subject", params.subject);

        const queryString = search.toString();

        return {
          url: queryString ? `/?${queryString}` : "/",
          method: "GET",
        };
      },
      providesTags: ["TeachersAssignedResultReport"],
    }),
  }),
});

export const { useGetTeachersAssignedResultReportQuery } =
  teachersAssignedResultReportApi;