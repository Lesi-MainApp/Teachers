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

const Select = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Select",
}) => (
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

const StudentPage = () => {
  const navigate = useNavigate();

  // ---- filter state ----
  const [status, setStatus] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [studentName, setStudentName] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");

  // ---- modal state ----
  const [selectedStudent, setSelectedStudent] = useState(null);

  // ---- dropdown options (replace with API later) ----
  const statusOptions = ["Active", "Inactive", "Blocked"];
  const districtOptions = ["Colombo", "Gampaha", "Kandy"];
  const townOptions = ["Dehiwala", "Maharagama", "Kiribathgoda", "Peradeniya"];
  const gradeOptions = ["6", "7", "8", "9", "10", "11"];
  const subjectOptions = ["Maths", "Science", "English", "ICT", "History"];

  // ---- sample table data (replace with API later) ----
  const rows = useMemo(
    () => [
      {
        id: "STU-001",
        name: "Nimal Perera",
        email: "nimal@mail.com",
        district: "Colombo",
        town: "Dehiwala",
        address: "No 12, Galle Road",
        grade: "6",
        subjects: ["Maths", "Science", "English"],
        status: "Active",
        lastActive: "2026-01-22",
      },
      {
        id: "STU-002",
        name: "Kavindi Silva",
        email: "kavindi@mail.com",
        district: "Gampaha",
        town: "Kiribathgoda",
        address: "No 88, Kandy Road",
        grade: "9",
        subjects: ["Science", "ICT"],
        status: "Inactive",
        lastActive: "2026-01-10",
      },
      {
        id: "STU-003",
        name: "Sahan Jayasooriya",
        email: "sahan@mail.com",
        district: "Kandy",
        town: "Peradeniya",
        address: "No 5, Temple Road",
        grade: "11",
        subjects: ["English", "History", "ICT"],
        status: "Active",
        lastActive: "2026-01-23",
      },
    ],
    []
  );

  // ---- filtering ----
  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      if (status && r.status !== status) return false;
      if (district && r.district !== district) return false;
      if (town && r.town !== town) return false;
      if (grade && r.grade !== grade) return false;
      if (subject && !r.subjects.includes(subject)) return false;
      if (
        studentName &&
        !r.name.toLowerCase().includes(studentName.trim().toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [rows, status, district, town, studentName, grade, subject]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setStatus("");
    setDistrict("");
    setTown("");
    setStudentName("");
    setGrade("");
    setSubject("");
  };

  const statusBadge = (value) => {
    const map = {
      Active: "border-green-200 bg-green-50 text-green-700",
      Inactive: "border-yellow-200 bg-yellow-50 text-yellow-700",
      Blocked: "border-red-200 bg-red-50 text-red-700",
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
    <>
      <div className="flex w-full justify-center">
        <div className="min-w-0 w-full max-w-[95vw] px-3 py-4 sm:px-6 sm:py-6">
          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Enroll Student
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Search and review enrolled student records.
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

              <Input
                label="Name"
                value={studentName}
                onChange={setStudentName}
                placeholder="Search by name"
              />

              <Select
                label="Grade"
                value={grade}
                onChange={setGrade}
                options={gradeOptions}
                placeholder="Select"
              />

              <Select
                label="Subjects"
                value={subject}
                onChange={setSubject}
                options={subjectOptions}
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
              <table className="w-full min-w-[1400px] table-fixed border-separate border-spacing-0">
                <thead>
                  <tr>
                    <Th className="w-[15%]">Student Name</Th>
                    <Th className="w-[8%]">Grade</Th>
                    <Th className="w-[11%]">Subjects</Th>
                    <Th className="w-[15%]">Email</Th>
                    <Th className="w-[11%]">District</Th>
                    <Th className="w-[11%]">Town</Th>
                    <Th className="w-[17%]">Address</Th>
                    <Th className="w-[12%]">Last Active Date</Th>
                    <Th className="w-[10%] border-r-0">Status</Th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {filteredRows.length === 0 ? (
                    <tr>
                      <td
                        className="px-6 py-10 text-center text-gray-500"
                        colSpan={9}
                      >
                        No students found
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map((s) => (
                      <tr key={s.id} className="hover:bg-gray-50/70">
                        <Td className="truncate font-medium text-gray-800">
                          {s.name}
                        </Td>

                        <Td className="truncate">{s.grade}</Td>

                        <Td className="text-center">
                          <button
                            type="button"
                            onClick={() => setSelectedStudent(s)}
                            className="rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-medium text-white transition hover:bg-blue-700"
                          >
                            View
                          </button>
                        </Td>

                        <Td className="truncate">{s.email}</Td>
                        <Td className="truncate">{s.district}</Td>
                        <Td className="truncate">{s.town}</Td>
                        <Td className="truncate">{s.address}</Td>
                        <Td className="truncate">{s.lastActive}</Td>
                        <Td className="border-r-0">{statusBadge(s.status)}</Td>
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

      {/* Subjects Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg border border-gray-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Enrolled Subjects
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedStudent.name}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
              >
                ✕
              </button>
            </div>

            <div className="px-5 py-4">
              {selectedStudent.subjects.length === 0 ? (
                <div className="text-sm text-gray-500">No subjects found</div>
              ) : (
                <div className="space-y-2">
                  {selectedStudent.subjects.map((sub, index) => (
                    <div
                      key={`${selectedStudent.id}-${sub}-${index}`}
                      className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {index + 1}. {sub}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end border-t border-gray-200 px-5 py-4">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentPage;