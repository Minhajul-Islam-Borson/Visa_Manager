import { useEffect, useState } from "react";
import { Download, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getDashboard, exportVisaExcel } from "../../services/dashboardApi";

import RecentVisaTable from "../../components/dashboard/RecentVisaTable";

const Dashboard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [totalVisa, setTotalVisa] = useState(0);

  const [recentVisa, setRecentVisa] = useState<any[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboard();

      setTotalVisa(res.data.data.totalVisa);

      setRecentVisa(res.data.data.recentVisa);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const res = await exportVisaExcel();

      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement("a");

      link.href = url;

      link.download = "Visa_Report.xlsx";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-8">
      {/* Header */}

      <div className="flex flex-col items-stretch justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Dashboard</h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Welcome back! Manage your visa records efficiently.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => navigate("/visa/add")}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white shadow transition hover:bg-blue-700 sm:w-auto"
          >
            <Plus size={18} />
            Add New Visa
          </button>

          <button
            onClick={handleDownload}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white shadow transition hover:bg-green-700 sm:w-auto"
          >
            <Download size={18} />
            Download Excel
          </button>
        </div>
      </div>

      {/* Total Visa Card */}

      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white shadow-lg sm:p-8">
        <p className="text-lg font-medium">Total Visa Records</p>

        <h2 className="mt-3 text-5xl font-bold sm:text-6xl">{totalVisa}</h2>

        <p className="mt-3 text-blue-100">
          Total visa applications currently stored in the system.
        </p>
      </div>

      {/* Recent Visa */}

      <div className="bg-white rounded-2xl shadow">
        <div className="flex items-center justify-between border-b px-4 py-4 sm:px-6">
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">
              Recent Visa Entries
            </h2>

            <p className="text-gray-500 text-sm">
              Latest visa records added to the system
            </p>
          </div>
        </div>

        <div className="p-3 sm:p-6">
          <RecentVisaTable visas={recentVisa} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
