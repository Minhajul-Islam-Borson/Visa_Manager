import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getSummaryReport, getMonthlyReport } from "../../services/reportApi";

import SummaryCards from "../../components/reports/SummaryCards";
import MonthlyChart from "../../components/reports/MonthlyChart";
import { ArrowLeft } from "lucide-react";

const Reports = () => {
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState(currentYear);

  const [summary, setSummary] = useState({
    totalVisa: 0,
    paid: 0,
    pending: 0,
  });

  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    loadSummary();
  }, []);

  useEffect(() => {
    loadMonthly();
  }, [year]);

  const loadSummary = async () => {
    const res = await getSummaryReport();

    setSummary(res.data.data);
  };

  const loadMonthly = async () => {
    const res = await getMonthlyReport(year);

    setMonthlyData(res.data.data);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-0 py-2 sm:space-y-8 sm:px-2 sm:py-6 lg:px-4">
      {/* Header */}

      <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold sm:text-4xl">Reports Dashboard</h1>

          <p className="text-slate-500 mt-2">Visa Statistics Overview</p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-600 sm:w-auto"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>
      </div>

      <SummaryCards
        totalVisa={summary.totalVisa}
        paid={summary.paid}
        pending={summary.pending}
      />

      <div className="min-w-0 rounded-2xl bg-white p-4 shadow-lg sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold sm:text-2xl">Monthly Entries</h2>

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-blue-500 sm:w-auto"
          >
            {[2024, 2025, 2026, 2027].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <MonthlyChart data={monthlyData} />
      </div>
    </div>
  );
};

export default Reports;
