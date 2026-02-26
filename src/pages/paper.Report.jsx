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

const PaperReport = () => {
  const navigate = useNavigate();

  // ---- filter state ----
  const [paperName, setPaperName] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [completedCount, setCompletedCount] = useState("");

  // ---- dropdown options (replace with API later) ----
  const subjectOptions = ["Maths", "Science", "English", "ICT", "History", "Tamil"];
  const gradeOptions = [
    "Grade 06",
    "Grade 07",
    "Grade 08",
    "Grade 09",
    "Grade 10",
    "Grade 11",
  ];
  const completedCountOptions = ["0", "1-25", "26-50", "51-100", "100+"];

  // ---- sample table data (replace with API later) ----
  const rows = useMemo(
    () => [
      {
        paperId: "PR-001",
        paperName: "Maths Term 1",
        grade: "Grade 06",
        subject: "Maths",
        time: "45 min",
        questionCount: 25,
        createdBy: "Mr. Silva",
        completedStudents: 80,
        completedRange: "51-100",
      },
      {
        paperId: "PR-002",
        paperName: "Science Unit Test",
        grade: "Grade 08",
        subject: "Science",
        time: "60 min",
        questionCount: 30,
        createdBy: "Mrs. Perera",
        completedStudents: 40,
        completedRange: "26-50",
      },
      {
        paperId: "PR-003",
        paperName: "English Term 1",
        grade: "Grade 07",
        subject: "English",
        time: "30 min",
        questionCount: 20,
        createdBy: "Ms. Fernando",
        completedStudents: 65,
        completedRange: "51-100",
      },
      {
        paperId: "PR-004",
        paperName: "ICT Term 1",
        grade: "Grade 09",
        subject: "ICT",
        time: "50 min",
        questionCount: 35,
        createdBy: "Mr. Jayasinghe",
        completedStudents: 0,
        completedRange: "0",
      },
    ],
    []
  );

  // ---- filtering ----
  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      if (
        paperName &&
        !r.paperName.toLowerCase().includes(paperName.trim().toLowerCase())
      ) {
        return false;
      }
      if (subject && r.subject !== subject) return false;
      if (grade && r.grade !== grade) return false;
      if (completedCount && r.completedRange !== completedCount) return false;
      return true;
    });
  }, [rows, paperName, subject, grade, completedCount]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setPaperName("");
    setSubject("");
    setGrade("");
    setCompletedCount("");
  };

  return (
    <div className="flex w-full justify-center">
      <div className="min-w-0 w-full max-w-[95vw] px-3 py-4 sm:px-6 sm:py-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Paper Report
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Filter and review paper report records.
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
            <Input
              label="Paper Name"
              value={paperName}
              onChange={setPaperName}
              placeholder="Search by paper name"
            />

            <Select
              label="Subject"
              value={subject}
              onChange={setSubject}
              options={subjectOptions}
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
              label="Paper Completed Student Count"
              value={completedCount}
              onChange={setCompletedCount}
              options={completedCountOptions}
              placeholder="Select"
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
            <table className="w-full min-w-[1200px] table-fixed border-separate border-spacing-0">
              <thead>
                <tr>
                  <Th className="w-[20%]">Paper Name</Th>
                  <Th className="w-[12%]">Grade</Th>
                  <Th className="w-[12%]">Subject</Th>
                  <Th className="w-[12%]">Time</Th>
                  <Th className="w-[12%]">Question Count</Th>
                  <Th className="w-[16%]">Created By</Th>
                  <Th className="w-[16%] border-r-0">Paper Completed Count</Th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {filteredRows.length === 0 ? (
                  <tr>
                    <td
                      className="px-6 py-10 text-center text-gray-500"
                      colSpan={7}
                    >
                      No paper reports found
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((p) => (
                    <tr key={p.paperId} className="hover:bg-gray-50/70">
                      <Td className="truncate font-medium text-gray-800">
                        {p.paperName}
                      </Td>
                      <Td className="truncate">{p.grade}</Td>
                      <Td className="truncate">{p.subject}</Td>
                      <Td className="truncate">{p.time}</Td>
                      <Td className="truncate">{p.questionCount}</Td>
                      <Td className="truncate">{p.createdBy}</Td>
                      <Td className="truncate border-r-0">
                        {p.completedStudents}
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

export default PaperReport;