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
  const [paperType, setPaperType] = useState("");
  const [subject, setSubject] = useState("");

  // ---- modal state ----
  const [selectedResult, setSelectedResult] = useState(null);

  // ---- dropdown options ----
  const paperTypeOptions = ["MCQ", "Essay", "Model Paper", "Unit Test"];
  const subjectOptions = ["Maths", "Science", "English", "ICT"];

  // ---- sample data (replace with API later) ----
  const rows = useMemo(
    () => [
      {
        id: "R-001",
        studentName: "Nimal Perera",
        grade: "Grade 06",
        subject: "Maths",
        paperName: "Maths Term 1",
        paperType: "MCQ",
        resultBreakdown: [
          {
            title: "Lesson Evaluation",
            correctAnswers: "6/10",
            marks: "60/100",
            progress: "60%",
          },
          {
            title: "Paper No - 1",
            correctAnswers: "8/10",
            marks: "80/100",
            progress: "80%",
          },
        ],
      },
      {
        id: "R-002",
        studentName: "Kavindi Silva",
        grade: "Grade 08",
        subject: "Science",
        paperName: "Science Unit Test",
        paperType: "Unit Test",
        resultBreakdown: [
          {
            title: "Unit Test",
            correctAnswers: "7/10",
            marks: "70/100",
            progress: "70%",
          },
          {
            title: "Paper No - 1",
            correctAnswers: "9/10",
            marks: "90/100",
            progress: "90%",
          },
        ],
      },
      {
        id: "R-003",
        studentName: "Sahan Jayasooriya",
        grade: "Grade 07",
        subject: "English",
        paperName: "English Term 1",
        paperType: "Model Paper",
        resultBreakdown: [
          {
            title: "Grammar Paper",
            correctAnswers: "5/10",
            marks: "50/100",
            progress: "50%",
          },
          {
            title: "Paper No - 1",
            correctAnswers: "8/10",
            marks: "80/100",
            progress: "80%",
          },
        ],
      },
      {
        id: "R-004",
        studentName: "Ishara Fernando",
        grade: "Grade 09",
        subject: "ICT",
        paperName: "ICT Term 1",
        paperType: "Essay",
        resultBreakdown: [
          {
            title: "Theory Paper",
            correctAnswers: "6/10",
            marks: "60/100",
            progress: "60%",
          },
          {
            title: "Paper No - 1",
            correctAnswers: "7/10",
            marks: "70/100",
            progress: "70%",
          },
        ],
      },
    ],
    []
  );

  // ---- filtering ----
  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      if (paperType && r.paperType !== paperType) return false;
      if (subject && r.subject !== subject) return false;
      return true;
    });
  }, [rows, paperType, subject]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setPaperType("");
    setSubject("");
  };

  return (
    <>
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
                label="Paper Type"
                value={paperType}
                onChange={setPaperType}
                options={paperTypeOptions}
                placeholder="Select Type"
              />

              <Select
                label="Subject"
                value={subject}
                onChange={setSubject}
                options={subjectOptions}
                placeholder="Select Subject"
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
              <table className="w-full min-w-[1000px] table-fixed border-separate border-spacing-0">
                <thead>
                  <tr>
                    <Th className="w-[26%]">Student Name</Th>
                    <Th className="w-[24%]">Paper Name</Th>
                    <Th className="w-[14%]">Grade</Th>
                    <Th className="w-[16%]">Subject</Th>
                    <Th className="w-[20%] border-r-0 text-center">Result</Th>
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
                          {r.studentName}
                        </Td>
                        <Td className="truncate">{r.paperName}</Td>
                        <Td className="truncate">{r.grade}</Td>
                        <Td className="truncate">{r.subject}</Td>
                        <Td className="border-r-0 text-center">
                          <button
                            type="button"
                            onClick={() => setSelectedResult(r)}
                            className="rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-medium text-white transition hover:bg-blue-700"
                          >
                            View Record
                          </button>
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

      {/* Result Record Modal */}
      {selectedResult && (
        <div className="fixed inset-0 z-50 bg-[#F3F4F6]">
          <button
            type="button"
            onClick={() => setSelectedResult(null)}
            className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-md transition hover:scale-105"
            title="Back"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex min-h-screen items-center justify-center px-4 py-16">
            <div className="w-full max-w-2xl rounded-2xl bg-[#F7F7F7] px-6 py-8 shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                <svg viewBox="0 0 64 64" className="h-12 w-12">
                  <circle cx="32" cy="24" r="12" fill="#F2B07B" />
                  <path d="M20 52c2-10 8-14 12-14s10 4 12 14" fill="#9CA3AF" />
                  <path d="M22 20c2-8 7-12 10-12 5 0 10 4 12 12l-2 5H24z" fill="#6B7280" />
                </svg>
              </div>

              <div className="mt-3 text-center">
                <p className="text-sm font-semibold text-gray-800">
                  Name : {selectedResult.studentName}
                </p>
                <p className="mt-1 text-sm font-medium text-gray-700">
                  Subject : {selectedResult.subject}
                </p>
                <p className="mt-1 text-sm font-medium text-gray-700">
                  Grade : {selectedResult.grade}
                </p>
              </div>

              <div className="mt-6 overflow-hidden border border-gray-300 bg-white">
                <table className="w-full border-separate border-spacing-0 text-center">
                  <thead>
                    <tr>
                      <th className="border-b border-r border-gray-300 px-3 py-3 text-[12px] font-semibold text-gray-700">
                        Paper / Lesson
                      </th>
                      <th className="border-b border-r border-gray-300 px-3 py-3 text-[12px] font-semibold text-gray-700">
                        Correct Answers
                      </th>
                      <th className="border-b border-r border-gray-300 px-3 py-3 text-[12px] font-semibold text-gray-700">
                        Result Marks
                      </th>
                      <th className="border-b border-gray-300 px-3 py-3 text-[12px] font-semibold text-gray-700">
                        Progress
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedResult.resultBreakdown.map((item, index) => (
                      <tr key={`${selectedResult.id}-${index}`}>
                        <td className="border-b border-r border-gray-300 px-3 py-4 text-[12px] text-gray-700">
                          {item.title}
                        </td>
                        <td className="border-b border-r border-gray-300 px-3 py-4 text-[12px] text-gray-700">
                          {item.correctAnswers}
                        </td>
                        <td className="border-b border-r border-gray-300 px-3 py-4 text-[12px] text-gray-700">
                          {item.marks}
                        </td>
                        <td className="border-b border-gray-300 px-3 py-4 text-[12px] text-gray-700">
                          {item.progress}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  onClick={() => setSelectedResult(null)}
                  className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Result;