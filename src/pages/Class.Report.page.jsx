import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Input = ({ label, value, onChange, placeholder = "" }) => (
  <div className="w-full">
    <label className="text-xs font-medium text-gray-600">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="mt-1 h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-300"
    />
  </div>
);

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

const ClassReport = () => {
  const navigate = useNavigate();

  const [reportId, setReportId] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [paperCount, setPaperCount] = useState("");

  // sample dropdown options
  const idOptions = ["CR-001", "CR-002", "CR-003", "CR-004", "CR-005"];
  const gradeOptions = [
    "Grade 06",
    "Grade 07",
    "Grade 08",
    "Grade 09",
    "Grade 10",
    "Grade 11",
  ];
  const subjectOptions = [
    "Maths",
    "Science",
    "English",
    "ICT",
    "History",
    "Tamil",
  ];
  const createdByOptions = ["Admin", "Teacher A", "Teacher B", "Teacher C"];

  // sample rows
  const rows = useMemo(
    () => [
      {
        id: "CR-001",
        grade: "Grade 06",
        subject: "Maths",
        paperCount: 12,
        enrollStudentCount: 120,
        createdBy: "Admin",
        createdDateTime: "2026-01-20 10:15 AM",
      },
      {
        id: "CR-002",
        grade: "Grade 08",
        subject: "Science",
        paperCount: 8,
        enrollStudentCount: 95,
        createdBy: "Teacher A",
        createdDateTime: "2026-01-22 04:40 PM",
      },
      {
        id: "CR-003",
        grade: "Grade 09",
        subject: "ICT",
        paperCount: 5,
        enrollStudentCount: 110,
        createdBy: "Teacher B",
        createdDateTime: "2026-01-23 09:05 AM",
      },
      {
        id: "CR-004",
        grade: "Grade 10",
        subject: "English",
        paperCount: 9,
        enrollStudentCount: 88,
        createdBy: "Teacher C",
        createdDateTime: "2026-01-24 01:20 PM",
      },
      {
        id: "CR-005",
        grade: "Grade 11",
        subject: "History",
        paperCount: 6,
        enrollStudentCount: 72,
        createdBy: "Admin",
        createdDateTime: "2026-01-25 11:45 AM",
      },
    ],
    []
  );

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      if (reportId && r.id !== reportId) return false;
      if (grade && r.grade !== grade) return false;
      if (subject && r.subject !== subject) return false;
      if (createdBy && r.createdBy !== createdBy) return false;
      if (paperCount && String(r.paperCount) !== String(paperCount)) return false;
      return true;
    });
  }, [rows, reportId, grade, subject, createdBy, paperCount]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setReportId("");
    setGrade("");
    setSubject("");
    setCreatedBy("");
    setPaperCount("");
  };

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
              Filter and review class report records.
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
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
            <Select
              label="Report ID"
              value={reportId}
              onChange={setReportId}
              options={idOptions}
              placeholder="Select"
            />

            <Select
              label="Grade"
              value={grade}
              onChange={setGrade}
              options={gradeOptions}
              placeholder="Select"
            />

            <Select
              label="Subject"
              value={subject}
              onChange={setSubject}
              options={subjectOptions}
              placeholder="Select"
            />

            <Select
              label="Created By"
              value={createdBy}
              onChange={setCreatedBy}
              options={createdByOptions}
              placeholder="Select"
            />

            <Input
              label="Paper Count"
              value={paperCount}
              onChange={(v) => setPaperCount(v.replace(/[^\d]/g, ""))}
              placeholder="Number"
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
            <table className="w-full min-w-[1100px] table-fixed border-separate border-spacing-0">
              <thead>
                <tr>
                  <Th className="w-[11%]">Report ID</Th>
                  <Th className="w-[14%]">Grade</Th>
                  <Th className="w-[16%]">Subject</Th>
                  <Th className="w-[12%]">Paper Count</Th>
                  <Th className="w-[16%]">Enroll Students</Th>
                  <Th className="w-[13%]">Created By</Th>
                  <Th className="w-[18%] border-r-0">Created Date & Time</Th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {filteredRows.length === 0 ? (
                  <tr>
                    <td
                      className="px-6 py-10 text-center text-gray-500"
                      colSpan={7}
                    >
                      No class reports found
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50/70">
                      <Td className="truncate font-medium text-gray-800">
                        {r.id}
                      </Td>
                      <Td className="truncate">{r.grade}</Td>
                      <Td className="truncate">{r.subject}</Td>
                      <Td className="truncate">{r.paperCount}</Td>
                      <Td className="truncate">{r.enrollStudentCount}</Td>
                      <Td className="truncate">{r.createdBy}</Td>
                      <Td className="truncate border-r-0">
                        {r.createdDateTime}
                      </Td>
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

export default ClassReport;