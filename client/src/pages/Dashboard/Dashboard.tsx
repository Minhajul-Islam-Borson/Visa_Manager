import {
  FileText,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  CreditCard,
  XCircle,
} from "lucide-react";

import StatCard from "../../components/dashboard/StatCard";

const Dashboard = () => {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Visa Management Dashboard
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <StatCard
          title="Total Visa"
          value={0}
          icon={FileText}
          color="bg-blue-500"
        />

        <StatCard
          title="Active Visa"
          value={0}
          icon={CheckCircle2}
          color="bg-green-500"
        />

        <StatCard
          title="Expired Visa"
          value={0}
          icon={AlertTriangle}
          color="bg-red-500"
        />

        <StatCard
          title="Pending File"
          value={0}
          icon={Clock3}
          color="bg-yellow-500"
        />

        <StatCard
          title="Paid"
          value={0}
          icon={CreditCard}
          color="bg-purple-500"
        />

        <StatCard
          title="Unpaid"
          value={0}
          icon={XCircle}
          color="bg-pink-500"
        />

      </div>

    </div>
  );
};

export default Dashboard;