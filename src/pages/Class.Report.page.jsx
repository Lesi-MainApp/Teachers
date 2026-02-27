import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTeachersAssignedClassReportQuery } from "../api/teachersAssignedClassReportApi";

const Th = ({ children, className = "" }) => (
  <th
    className={`border-b border-r border-gray-200 bg-[#F8FAFC] px-4 py-3 text-left text-[13px] font-medium text-gray-600 ${className}`}
  >
    {children}
  </th>
);

const Td = ({ children, className = "" }) => (
  <td
    className={`border-b border-r border-gray-200 px-4 py-4 align-top text-sm text-gray-700 ${className}`}
  >
    {children}
  </td>
);

const ClassReport = () => {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetTeachersAssignedClassReportQuery();

  const rows = useMemo(() => {
    try {
      return Array.isArray(data?.reports) ? data.reports : [];
    } catch (err) {
      console.error("Class.Report rows memo error:", err);
      return [];
    }
  }, [data]);

  const errorMessage = useMemo(() => {
    try {
      if (!error) return "";
      if ("status" in error) {
        return error?.data?.message || `Request failed (${error.status})`;
      }
      return error?.message || "Something went wrong";
    } catch (err) {
      console.error("Class.Report errorMessage memo error:", err);
      return "Something went wrong";
    }
  }, [error]);

  if (error) {
    console.error("Teachers assigned class report API error:", error);
  }

  return (
    <div className="flex w-full justify-center">
      <div className="min-w-0 w-full max-w-[95vw] px-3 py-4 sm:px-6 sm:py-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Class Report
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Review class report records.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                try {
                  refetch();
                } catch (err) {
                  console.error("Class.Report refetch button error:", err);
                }
              }}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Refresh
            </button>

            <button
              type="button"
              onClick={() => navigate("/home")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 hover:text-red-700"
              title="Home"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 10.5 12 3l9 7.5" />
                <path d="M5 9.5V21h14V9.5" />
                <path d="M9 21v-6h6v6" />
              </svg>
            </button>
          </div>
        </div>

        {errorMessage ? (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        {/* Table */}
        <div className="mt-5 overflow-hidden border border-gray-200 bg-white">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1200px] table-fixed border-separate border-spacing-0">
              <thead>
                <tr>
                  <Th className="w-[20%]">Class Name</Th>
                  <Th className="w-[12%]">Grade</Th>
                  <Th className="w-[14%]">Subject</Th>
                  <Th className="w-[14%]">Enroll Student Count</Th>
                  <Th className="w-[18%]">Created Date & Time</Th>
                  <Th className="w-[11%]">Lesson Count</Th>
                  <Th className="w-[11%] border-r-0">Live Class Count</Th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {isLoading || isFetching ? (
                  <tr>
                    <td
                      className="px-6 py-10 text-center text-gray-500"
                      colSpan={7}
                    >
                      Loading class reports...
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td
                      className="px-6 py-10 text-center text-gray-500"
                      colSpan={7}
                    >
                      No class reports found
                    </td>
                  </tr>
                ) : (
                  rows.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50/70">
                      <Td className="truncate font-medium text-gray-800">
                        {r.className || "-"}
                      </Td>
                      <Td className="truncate">{r.grade || "-"}</Td>
                      <Td className="truncate">{r.subject || "-"}</Td>
                      <Td className="truncate">{r.enrollStudentCount ?? 0}</Td>
                      <Td className="truncate">{r.createdDateTime || "-"}</Td>
                      <Td className="truncate">{r.lessonCount ?? 0}</Td>
                      <Td className="truncate border-r-0">
                        {r.liveClassCount ?? 0}
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-2 border-t border-gray-200 bg-white px-4 py-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <span>Showing {rows.length} record(s)</span>
            <span>Teachers assigned class report</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassReport;