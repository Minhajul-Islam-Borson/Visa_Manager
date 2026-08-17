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
    <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Reports Dashboard</h1>

          <p className="text-slate-500 mt-2">Visa Statistics Overview</p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all duration-200 shadow-sm"
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

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Monthly Entries</h2>

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
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
