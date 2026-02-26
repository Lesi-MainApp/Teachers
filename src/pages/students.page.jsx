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

const StudentsPage = () => {
  const navigate = useNavigate();

  // ---- filter state ----
  const [status, setStatus] = useState("");
  const [regNo, setRegNo] = useState("");
  const [completePapers, setCompletePapers] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [subject, setSubject] = useState("");
  const [studentName, setStudentName] = useState("");

  // ---- dropdown options (replace with API later) ----
  const statusOptions = ["Active", "Inactive", "Blocked"];
  const regNoOptions = ["REG-001", "REG-002", "REG-003"];
  const completePapersOptions = ["0", "1-5", "6-10", "10+"];
  const districtOptions = ["Colombo", "Gampaha", "Kandy"];
  const townOptions = ["Dehiwala", "Maharagama", "Kiribathgoda", "Peradeniya"];
  const subjectOptions = ["Maths", "Science", "English", "ICT", "History"];

  // ---- sample table data (replace with API later) ----
  const rows = useMemo(
    () => [
      {
        regNo: "REG-001",
        name: "Nimal Perera",
        email: "nimal@mail.com",
        district: "Colombo",
        town: "Dehiwala",
        address: "No 12, Galle Road",
        grade: "6",
        subject: "Maths",
        status: "Active",
        lastActive: "2026-01-22",
        completePapers: "6-10",
      },
      {
        regNo: "REG-002",
        name: "Kavindi Silva",
        email: "kavindi@mail.com",
        district: "Gampaha",
        town: "Kiribathgoda",
        address: "No 88, Kandy Road",
        grade: "9",
        subject: "Science",
        status: "Inactive",
        lastActive: "2026-01-10",
        completePapers: "1-5",
      },
      {
        regNo: "REG-003",
        name: "Sahan Jayasooriya",
        email: "sahan@mail.com",
        district: "Kandy",
        town: "Peradeniya",
        address: "No 5, Temple Road",
        grade: "11",
        subject: "English",
        status: "Active",
        lastActive: "2026-01-23",
        completePapers: "10+",
      },
    ],
    []
  );

  // ---- filtering ----
  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      if (status && r.status !== status) return false;
      if (regNo && r.regNo !== regNo) return false;
      if (completePapers && r.completePapers !== completePapers) return false;
      if (district && r.district !== district) return false;
      if (town && r.town !== town) return false;
      if (subject && r.subject !== subject) return false;
      if (
        studentName &&
        !r.name.toLowerCase().includes(studentName.trim().toLowerCase())
      )
        return false;
      return true;
    });
  }, [rows, status, regNo, completePapers, district, town, subject, studentName]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setStatus("");
    setRegNo("");
    setCompletePapers("");
    setDistrict("");
    setTown("");
    setSubject("");
    setStudentName("");
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
    <div className="flex w-full justify-center">
      <div className="min-w-0 w-full max-w-[95vw] px-3 py-4 sm:px-6 sm:py-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Student Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Search and review student records.
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
              label="Registration No"
              value={regNo}
              onChange={setRegNo}
              options={regNoOptions}
              placeholder="Select"
            />

            <Select
              label="Complete Papers"
              value={completePapers}
              onChange={setCompletePapers}
              options={completePapersOptions}
              placeholder="Select"
            />

            <Input
              label="Student Name"
              value={studentName}
              onChange={setStudentName}
              placeholder="Search by name"
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

            <Select
              label="Subject"
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
            <table className="w-full min-w-[1450px] table-fixed border-separate border-spacing-0">
              <thead>
                <tr>
                  <Th className="w-[8%]">Reg No</Th>
                  <Th className="w-[12%]">Student Name</Th>
                  <Th className="w-[14%]">Email</Th>
                  <Th className="w-[8%]">District</Th>
                  <Th className="w-[8%]">Town</Th>
                  <Th className="w-[14%]">Address</Th>
                  <Th className="w-[6%]">Grade</Th>
                  <Th className="w-[8%]">Subject</Th>
                  <Th className="w-[8%]">Status</Th>
                  <Th className="w-[10%]">Last Active</Th>
                  <Th className="w-[10%]">Complete Papers</Th>
                  <Th className="w-[14%] border-r-0 text-center">Operation</Th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {filteredRows.length === 0 ? (
                  <tr>
                    <td
                      className="px-6 py-10 text-center text-gray-500"
                      colSpan={12}
                    >
                      No students found
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((s) => (
                    <tr key={s.regNo} className="hover:bg-gray-50/70">
                      <Td className="truncate">{s.regNo}</Td>
                      <Td className="truncate font-medium text-gray-800">
                        {s.name}
                      </Td>
                      <Td className="truncate">{s.email}</Td>
                      <Td className="truncate">{s.district}</Td>
                      <Td className="truncate">{s.town}</Td>
                      <Td className="truncate">{s.address}</Td>
                      <Td className="truncate">{s.grade}</Td>
                      <Td className="truncate">{s.subject}</Td>
                      <Td>{statusBadge(s.status)}</Td>
                      <Td className="truncate">{s.lastActive}</Td>
                      <Td className="truncate">{s.completePapers}</Td>

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

export default StudentsPage;