import { useEffect, useState } from "react";
import { Download, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getDashboard,
  exportVisaExcel,
} from "../../services/dashboardApi";

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

      const url = window.URL.createObjectURL(
        new Blob([res.data])
      );

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
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome back! Manage your visa records efficiently.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => navigate("/visa/add")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow transition"
          >
            <Plus size={18} />
            Add New Visa
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow transition"
          >
            <Download size={18} />
            Download Excel
          </button>

        </div>

      </div>

      {/* Total Visa Card */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-8 text-white">

        <p className="text-lg font-medium">
          Total Visa Records
        </p>

        <h2 className="text-6xl font-bold mt-3">
          {totalVisa}
        </h2>

        <p className="mt-3 text-blue-100">
          Total visa applications currently stored in the system.
        </p>

      </div>

      {/* Recent Visa */}

      <div className="bg-white rounded-2xl shadow">

        <div className="flex justify-between items-center border-b px-6 py-4">

          <div>

            <h2 className="text-2xl font-semibold">
              Recent Visa Entries
            </h2>

            <p className="text-gray-500 text-sm">
              Latest visa records added to the system
            </p>

          </div>

        </div>

        <div className="p-6">

          <RecentVisaTable visas={recentVisa} />

        </div>

      </div>

    </div>
  );
};

export default Dashboard;