import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTechersPaperReportQuery } from "../api/techersPaperReportApi";

const DEFAULT_PAPER_TYPE = "Daily Quiz";

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
      {options.map((op) => {
        const optionValue = String(op?.value ?? op ?? "");
        const optionLabel = String(op?.label ?? op ?? "");
        return (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
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

const PaperReport = () => {
  const navigate = useNavigate();

  const [paperName, setPaperName] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [paperType, setPaperType] = useState(DEFAULT_PAPER_TYPE);

  const [appliedFilters, setAppliedFilters] = useState({
    paperName: "",
    subject: "",
    grade: "",
    paperType: DEFAULT_PAPER_TYPE,
  });

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetTechersPaperReportQuery(appliedFilters);

  const rows = useMemo(() => {
    try {
      return Array.isArray(data?.reports) ? data.reports : [];
    } catch (err) {
      console.error("paper.Report rows memo error:", err);
      return [];
    }
  }, [data]);

  const subjectOptions = useMemo(() => {
    try {
      return Array.isArray(data?.filters?.subjects) ? data.filters.subjects : [];
    } catch (err) {
      console.error("paper.Report subjectOptions error:", err);
      return [];
    }
  }, [data]);

  const gradeOptions = useMemo(() => {
    try {
      return Array.isArray(data?.filters?.grades) ? data.filters.grades : [];
    } catch (err) {
      console.error("paper.Report gradeOptions error:", err);
      return [];
    }
  }, [data]);

  const rawPaperTypeOptions = useMemo(() => {
    try {
      return Array.isArray(data?.filters?.paperTypes) ? data.filters.paperTypes : [];
    } catch (err) {
      console.error("paper.Report paperTypeOptions error:", err);
      return [];
    }
  }, [data]);

  const paperTypeOptions = useMemo(() => {
    try {
      const set = new Set(
        [DEFAULT_PAPER_TYPE, ...rawPaperTypeOptions]
          .map((v) => String(v || "").trim())
          .filter(Boolean)
      );
      return Array.from(set);
    } catch (err) {
      console.error("paper.Report merged paperTypeOptions error:", err);
      return [DEFAULT_PAPER_TYPE];
    }
  }, [rawPaperTypeOptions]);

  const handleSearch = (e) => {
    e.preventDefault();
    try {
      setAppliedFilters({
        paperName: paperName.trim(),
        subject: subject.trim(),
        grade: grade.trim(),
        paperType: paperType.trim(),
      });
    } catch (err) {
      console.error("paper.Report handleSearch error:", err);
    }
  };

  const handleReset = () => {
    try {
      setPaperName("");
      setSubject("");
      setGrade("");
      setPaperType(DEFAULT_PAPER_TYPE);

      setAppliedFilters({
        paperName: "",
        subject: "",
        grade: "",
        paperType: DEFAULT_PAPER_TYPE,
      });
    } catch (err) {
      console.error("paper.Report handleReset error:", err);
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
      console.error("paper.Report errorMessage memo error:", err);
      return "Something went wrong";
    }
  }, [error]);

  if (error) {
    console.error("Teacher paper report API error:", error);
  }

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
              label="Paper Type"
              value={paperType}
              onChange={setPaperType}
              options={paperTypeOptions}
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
              label="Grade"
              value={grade}
              onChange={setGrade}
              options={gradeOptions}
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
                  console.error("paper.Report refetch button error:", err);
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
            <table className="w-full min-w-[1150px] table-fixed border-separate border-spacing-0">
              <thead>
                <tr>
                  <Th className="w-[28%]">Paper Name</Th>
                  <Th className="w-[14%]">Grade</Th>
                  <Th className="w-[14%]">Subject</Th>
                  <Th className="w-[14%]">Time</Th>
                  <Th className="w-[14%]">Question Count</Th>
                  <Th className="w-[16%] border-r-0">Created By</Th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {isLoading || isFetching ? (
                  <tr>
                    <td
                      className="px-6 py-10 text-center text-gray-500"
                      colSpan={6}
                    >
                      Loading paper reports...
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td
                      className="px-6 py-10 text-center text-gray-500"
                      colSpan={6}
                    >
                      No paper reports found
                    </td>
                  </tr>
                ) : (
                  rows.map((p) => (
                    <tr key={p.paperId} className="hover:bg-gray-50/70">
                      <Td className="truncate font-medium text-gray-800">
                        {p.paperName || "-"}
                      </Td>
                      <Td className="truncate">{p.grade || "-"}</Td>
                      <Td className="truncate">{p.subject || "-"}</Td>
                      <Td className="truncate">{p.time || "-"}</Td>
                      <Td className="truncate">{p.questionCount ?? "-"}</Td>
                      <Td className="truncate border-r-0">{p.createdBy || "-"}</Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-2 border-t border-gray-200 bg-white px-4 py-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <span>Showing {rows.length} record(s)</span>
            <span>Teacher assigned paper report</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperReport;