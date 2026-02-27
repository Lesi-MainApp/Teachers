import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export const techersPaperReportApi = createApi({
  reducerPath: "techersPaperReportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/teachers-paper-report`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      try {
        const token = getState()?.auth?.token;
        if (token) headers.set("Authorization", `Bearer ${token}`);
      } catch (err) {
        console.error("techersPaperReportApi prepareHeaders error:", err);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTechersPaperReport: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();

        if (params.paperName) search.set("paperName", params.paperName);
        if (params.subject) search.set("subject", params.subject);
        if (params.grade) search.set("grade", params.grade);
        if (params.paperType) search.set("paperType", params.paperType);

        const queryString = search.toString();

        return {
          url: queryString ? `/?${queryString}` : "/",
          method: "GET",
        };
      },
      providesTags: ["TechersPaperReport"],
    }),
  }),
});

export const { useGetTechersPaperReportQuery } = techersPaperReportApi;