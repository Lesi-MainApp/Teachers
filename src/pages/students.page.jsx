import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTeacherEnrollSubjectStudentsQuery } from "../api/teacherEnrollSubjectApi";

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
      {options.map((op) => {
        const value = String(op?.value ?? op ?? "");
        const label = String(op?.label ?? op ?? "");
        return (
          <option key={value} value={value}>
            {label}
          </option>
        );
      })}
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

const Studentspage = () => {
  const navigate = useNavigate();

  // filter inputs (same design)
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [studentName, setStudentName] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");

  // actual query filters (search button apply)
  const [appliedFilters, setAppliedFilters] = useState({
    district: "",
    town: "",
    studentName: "",
    grade: "",
    subject: "",
  });

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetTeacherEnrollSubjectStudentsQuery(appliedFilters);

  const rows = useMemo(() => {
    try {
      return Array.isArray(data?.students) ? data.students : [];
    } catch (err) {
      console.error("students.page rows memo error:", err);
      return [];
    }
  }, [data]);

  const districtOptions = useMemo(() => {
    try {
      return Array.isArray(data?.filters?.districts) ? data.filters.districts : [];
    } catch (err) {
      console.error("districtOptions error:", err);
      return [];
    }
  }, [data]);

  const townOptions = useMemo(() => {
    try {
      return Array.isArray(data?.filters?.towns) ? data.filters.towns : [];
    } catch (err) {
      console.error("townOptions error:", err);
      return [];
    }
  }, [data]);

  const gradeOptions = useMemo(() => {
    try {
      return Array.isArray(data?.filters?.grades) ? data.filters.grades : [];
    } catch (err) {
      console.error("gradeOptions error:", err);
      return [];
    }
  }, [data]);

  const subjectOptions = useMemo(() => {
    try {
      return Array.isArray(data?.filters?.subjects) ? data.filters.subjects : [];
    } catch (err) {
      console.error("subjectOptions error:", err);
      return [];
    }
  }, [data]);

  const handleSearch = (e) => {
    e.preventDefault();
    try {
      setAppliedFilters({
        district: district.trim(),
        town: town.trim(),
        studentName: studentName.trim(),
        grade: grade.trim(),
        subject: subject.trim(),
      });
    } catch (err) {
      console.error("handleSearch error:", err);
    }
  };

  const handleReset = () => {
    try {
      setDistrict("");
      setTown("");
      setStudentName("");
      setGrade("");
      setSubject("");

      setAppliedFilters({
        district: "",
        town: "",
        studentName: "",
        grade: "",
        subject: "",
      });
    } catch (err) {
      console.error("handleReset error:", err);
    }
  };

  const errorMessage = useMemo(() => {
    try {
      if (!error) return "";
      if ("status" in error) {
        return error?.data?.message || `Request failed (${error.status})`;
      }
      return error?.message || "Something went wrong";
    } catch (err) {
      console.error("errorMessage memo error:", err);
      return "Something went wrong";
    }
  }, [error]);

  if (error) {
    console.error("Teacher enrolled students API error:", error);
  }

  return (
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

            <button
              type="button"
              onClick={() => {
                try {
                  refetch();
                } catch (err) {
                  console.error("refetch button error:", err);
                }
              }}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Refresh
            </button>
          </div>

          <div className="mt-3 text-xs text-gray-500">
            Total: {Number(data?.total || rows.length || 0)}
          </div>

          {errorMessage ? (
            <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}
        </form>

        {/* Table */}
        <div className="mt-5 overflow-hidden border border-gray-200 bg-white">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1200px] table-fixed border-separate border-spacing-0">
              <thead>
                <tr>
                  <Th className="w-[18%]">Student Name</Th>
                  <Th className="w-[10%]">Grade</Th>
                  <Th className="w-[14%]">Subject</Th>
                  <Th className="w-[18%]">Email</Th>
                  <Th className="w-[12%]">District</Th>
                  <Th className="w-[12%]">Town</Th>
                  <Th className="w-[16%] border-r-0">Address</Th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {isLoading || isFetching ? (
                  <tr>
                    <td
                      className="px-6 py-10 text-center text-gray-500"
                      colSpan={7}
                    >
                      Loading students...
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td
                      className="px-6 py-10 text-center text-gray-500"
                      colSpan={7}
                    >
                      No students found
                    </td>
                  </tr>
                ) : (
                  rows.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50/70">
                      <Td className="truncate font-medium text-gray-800">
                        {s.studentName || "-"}
                      </Td>
                      <Td className="truncate">{s.grade || "-"}</Td>
                      <Td className="truncate">{s.subject || "-"}</Td>
                      <Td className="truncate">{s.email || "-"}</Td>
                      <Td className="truncate">{s.district || "-"}</Td>
                      <Td className="truncate">{s.town || "-"}</Td>
                      <Td className="truncate border-r-0">{s.address || "-"}</Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-2 border-t border-gray-200 bg-white px-4 py-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <span>Showing {rows.length} record(s)</span>
            <span>Teacher enrolled students</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studentspage;