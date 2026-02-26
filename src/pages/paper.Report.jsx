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
  const [status, setStatus] = useState("");
  const [paperId, setPaperId] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [paperName, setPaperName] = useState("");

  // ---- dropdown options (replace with API later) ----
  const statusOptions = ["Published", "Draft", "Pending"];
  const paperIdOptions = ["PR-001", "PR-002", "PR-003", "PR-004"];
  const gradeOptions = [
    "Grade 06",
    "Grade 07",
    "Grade 08",
    "Grade 09",
    "Grade 10",
    "Grade 11",
  ];
  const subjectOptions = ["Maths", "Science", "English", "ICT", "History", "Tamil"];
  const districtOptions = ["Colombo", "Gampaha", "Kandy"];
  const townOptions = ["Dehiwala", "Maharagama", "Kiribathgoda", "Peradeniya"];

  // ---- sample table data (replace with API later) ----
  const rows = useMemo(
    () => [
      {
        paperId: "PR-001",
        paperName: "Maths Term 1",
        grade: "Grade 06",
        subject: "Maths",
        district: "Colombo",
        town: "Dehiwala",
        totalStudents: 120,
        submitted: 80,
        avgMarks: 67,
        date: "2026-01-10",
        status: "Published",
      },
      {
        paperId: "PR-002",
        paperName: "Science Unit Test",
        grade: "Grade 08",
        subject: "Science",
        district: "Gampaha",
        town: "Kiribathgoda",
        totalStudents: 95,
        submitted: 40,
        avgMarks: 54,
        date: "2026-01-12",
        status: "Draft",
      },
      {
        paperId: "PR-003",
        paperName: "English Term 1",
        grade: "Grade 07",
        subject: "English",
        district: "Kandy",
        town: "Peradeniya",
        totalStudents: 70,
        submitted: 65,
        avgMarks: 74,
        date: "2026-01-15",
        status: "Published",
      },
      {
        paperId: "PR-004",
        paperName: "ICT Term 1",
        grade: "Grade 09",
        subject: "ICT",
        district: "Colombo",
        town: "Maharagama",
        totalStudents: 110,
        submitted: 0,
        avgMarks: 0,
        date: "2026-01-18",
        status: "Pending",
      },
    ],
    []
  );

  // ---- filtering ----
  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      if (status && r.status !== status) return false;
      if (paperId && r.paperId !== paperId) return false;
      if (grade && r.grade !== grade) return false;
      if (subject && r.subject !== subject) return false;
      if (district && r.district !== district) return false;
      if (town && r.town !== town) return false;
      if (
        paperName &&
        !r.paperName.toLowerCase().includes(paperName.trim().toLowerCase())
      )
        return false;
      return true;
    });
  }, [rows, status, paperId, grade, subject, district, town, paperName]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setStatus("");
    setPaperId("");
    setGrade("");
    setSubject("");
    setDistrict("");
    setTown("");
    setPaperName("");
  };

  const statusBadge = (value) => {
    const map = {
      Published: "border-green-200 bg-green-50 text-green-700",
      Draft: "border-gray-200 bg-gray-100 text-gray-700",
      Pending: "border-yellow-200 bg-yellow-50 text-yellow-700",
    };

    return (
      <span
        className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${
          map[value] || "border-gray-200 bg-gray-50 text-gray-700"
        }`}
      >
        {value}
      </span>
    );
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
              Filter and review paper performance records.
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
              label="Status"
              value={status}
              onChange={setStatus}
              options={statusOptions}
              placeholder="Select"
            />

            <Select
              label="Paper ID"
              value={paperId}
              onChange={setPaperId}
              options={paperIdOptions}
              placeholder="Select"
            />

            <Select
              label="Grade"
              value={grade}
              onChange={setGrade}
              options={gradeOptions}
              placeholder="Select"
            />

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
              label="District"
              value={district}
              onChange={setDistrict}
              options={districtOptions}
              placeholder="Select"
            />

            <Select
              label="Town"
              value={town}
              onChange={setTown}
              options={townOptions}
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
            <table className="w-full min-w-[1500px] table-fixed border-separate border-spacing-0">
              <thead>
                <tr>
                  <Th className="w-[8%]">Paper ID</Th>
                  <Th className="w-[14%]">Paper Name</Th>
                  <Th className="w-[8%]">Grade</Th>
                  <Th className="w-[8%]">Subject</Th>
                  <Th className="w-[8%]">District</Th>
                  <Th className="w-[8%]">Town</Th>
                  <Th className="w-[9%]">Total Students</Th>
                  <Th className="w-[8%]">Submitted</Th>
                  <Th className="w-[8%]">Avg Marks</Th>
                  <Th className="w-[10%]">Date</Th>
                  <Th className="w-[9%]">Status</Th>
                  <Th className="w-[12%] border-r-0 text-center">Operation</Th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {filteredRows.length === 0 ? (
                  <tr>
                    <td
                      className="px-6 py-10 text-center text-gray-500"
                      colSpan={12}
                    >
                      No paper reports found
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((p) => (
                    <tr key={p.paperId} className="hover:bg-gray-50/70">
                      <Td className="truncate font-medium text-gray-800">
                        {p.paperId}
                      </Td>
                      <Td className="truncate">{p.paperName}</Td>
                      <Td className="truncate">{p.grade}</Td>
                      <Td className="truncate">{p.subject}</Td>
                      <Td className="truncate">{p.district}</Td>
                      <Td className="truncate">{p.town}</Td>
                      <Td className="truncate">{p.totalStudents}</Td>
                      <Td className="truncate">{p.submitted}</Td>
                      <Td className="truncate">{p.avgMarks}</Td>
                      <Td className="truncate">{p.date}</Td>
                      <Td>{statusBadge(p.status)}</Td>

                      <Td className="border-r-0 text-center">
                        <div className="flex flex-wrap justify-center gap-2">
                          <button
                            type="button"
                            className="rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-medium text-white transition hover:bg-blue-700"
                          >
                            View
                          </button>

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
            <span>Showing {filteredRows.length} record(s)</span>
            <span>Sample local data</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperReport;