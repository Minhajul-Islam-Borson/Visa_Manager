import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {
  data: {
    month: number;
    total: number;
  }[];
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MonthlyChart = ({ data }: Props) => {

  const chartData = data.map((item) => ({
    month: monthNames[item.month - 1],
    total: item.total,
  }));

  return (

    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">
        Monthly Visa Entries
      </h2>

      <ResponsiveContainer
        width="100%"
        height={400}
      >

        <BarChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="total"
            radius={[8, 8, 0, 0]}
            fill="#2563eb"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );
};

export default MonthlyChart;