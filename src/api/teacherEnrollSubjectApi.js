import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export const teacherEnrollSubjectApi = createApi({
  reducerPath: "teacherEnrollSubjectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/teacher-enroll-subject`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      try {
        const token = getState()?.auth?.token;
        if (token) headers.set("Authorization", `Bearer ${token}`);
      } catch (err) {
        console.error("teacherEnrollSubjectApi prepareHeaders error:", err);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTeacherEnrollSubjectStudents: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();

        if (params.district) search.set("district", params.district);
        if (params.town) search.set("town", params.town);
        if (params.studentName) search.set("studentName", params.studentName);
        if (params.grade) search.set("grade", params.grade);
        if (params.subject) search.set("subject", params.subject);

        const queryString = search.toString();
        return {
          url: `/students${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["TeacherEnrollSubjectStudents"],
    }),
  }),
});

export const { useGetTeacherEnrollSubjectStudentsQuery } =
  teacherEnrollSubjectApi;