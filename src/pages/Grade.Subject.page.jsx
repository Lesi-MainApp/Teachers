import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

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

const GradeSubjectPage = () => {
  const navigate = useNavigate();

  // sample data (replace with API later)
  const rows = useMemo(
    () => [
      { id: "GS-001", grade: "Grade 6", subject: "Maths" },
      { id: "GS-002", grade: "Grade 7", subject: "Science" },
      { id: "GS-003", grade: "Grade 9", subject: "English" },
      { id: "GS-004", grade: "Grade 10", subject: "ICT" },
    ],
    []
  );

  return (
    <div className="flex w-full justify-center">
      <div className="min-w-0 w-full max-w-[95vw] px-3 py-4 sm:px-6 sm:py-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Grade & Subjects
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage grade and subject records.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition hover:bg-green-700"
            >
              + Add Grade & Subject
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

        {/* Table */}
        <div className="mt-5 overflow-hidden border border-gray-200 bg-white">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[700px] table-fixed border-separate border-spacing-0">
              <thead>
                <tr>
                  <Th className="w-[15%]">ID</Th>
                  <Th className="w-[25%]">Grade</Th>
                  <Th className="w-[35%]">Subject</Th>
                  <Th className="w-[25%] border-r-0 text-center">Operation</Th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No grade/subject records found
                    </td>
                  </tr>
                ) : (
                  rows.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50/70">
                      <Td className="truncate font-medium text-gray-800">
                        {r.id}
                      </Td>
                      <Td className="truncate">{r.grade}</Td>
                      <Td className="truncate">{r.subject}</Td>

                      <Td className="border-r-0 text-center">
                        <div className="flex flex-wrap justify-center gap-2">
                          <button
                            type="button"
                            className="rounded-lg bg-amber-500 px-3 py-1.5 text-[11px] font-medium text-white transition hover:bg-amber-600"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="rounded-lg bg-red-600 px-3 py-1.5 text-[11px] font-medium text-white transition hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
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
            <span>Sample local data</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeSubjectPage;