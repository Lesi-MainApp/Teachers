import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Select = ({ label, value, onChange, options, placeholder = "Select" }) => (
  <div className="w-full">
    <label className="text-xs font-medium text-gray-600">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-300"
    >
      <option value="">{placeholder}</option>
      {options.map((op) => (
        <option key={String(op.value ?? op)} value={String(op.value ?? op)}>
          {String(op.label ?? op)}
        </option>
      ))}
    </select>
  </div>
);

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

const Result = () => {
  const navigate = useNavigate();

  // ---- filter state ----
  const [paperName, setPaperName] = useState("");

  // ---- dropdown options (replace with API later) ----
  const paperOptions = [
    "Maths Term 1",
    "Science Unit Test",
    "English Term 1",
    "ICT Term 1",
  ];

  // ---- sample table data (replace with API later) ----
  const rows = useMemo(
    () => [
      {
        id: "R-001",
        studentName: "Nimal Perera",
        grade: "Grade 06",
        subject: "Maths",
        exam: "Maths Term 1",
      },
      {
        id: "R-002",
        studentName: "Kavindi Silva",
        grade: "Grade 08",
        subject: "Science",
        exam: "Science Unit Test",
      },
      {
        id: "R-003",
        studentName: "Sahan Jayasooriya",
        grade: "Grade 07",
        subject: "English",
        exam: "English Term 1",
      },
      {
        id: "R-004",
        studentName: "Ishara Fernando",
        grade: "Grade 09",
        subject: "ICT",
        exam: "ICT Term 1",
      },
    ],
    []
  );

  // ---- filtering ----
  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      if (paperName && r.exam !== paperName) return false;
      return true;
    });
  }, [rows, paperName]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setPaperName("");
  };

  return (
    <div className="flex w-full justify-center">
      <div className="min-w-0 w-full max-w-[95vw] px-3 py-4 sm:px-6 sm:py-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Result
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Filter and review student result records.
            </p>
          </div>

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

        {/* Filter Box */}
        <form
          onSubmit={handleSearch}
          className="mt-5 border border-gray-200 bg-white p-4 sm:p-5"
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            <Select
              label="Paper Name"
              value={paperName}
              onChange={setPaperName}
              options={paperOptions}
              placeholder="Select Paper"
            />
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Search
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Reset
            </button>
          </div>

          <div className="mt-3 text-xs text-gray-500">
            Total: {filteredRows.length}
          </div>
        </form>

        {/* Table */}
        <div className="mt-5 overflow-hidden border border-gray-200 bg-white">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[900px] table-fixed border-separate border-spacing-0">
              <thead>
                <tr>
                  <Th className="w-[12%]">ID</Th>
                  <Th className="w-[28%]">Student Name</Th>
                  <Th className="w-[15%]">Grade</Th>
                  <Th className="w-[15%]">Subject</Th>
                  <Th className="w-[30%] border-r-0">Exam</Th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {filteredRows.length === 0 ? (
                  <tr>
                    <td
                      className="px-6 py-10 text-center text-gray-500"
                      colSpan={5}
                    >
                      No results found
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50/70">
                      <Td className="truncate font-medium text-gray-800">
                        {r.id}
                      </Td>
                      <Td className="truncate">{r.studentName}</Td>
                      <Td className="truncate">{r.grade}</Td>
                      <Td className="truncate">{r.subject}</Td>
                      <Td className="truncate border-r-0">{r.exam}</Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-2 border-t border-gray-200 bg-white px-4 py-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <span>Showing {filteredRows.length} record(s)</span>
            <span>Sample local data</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;