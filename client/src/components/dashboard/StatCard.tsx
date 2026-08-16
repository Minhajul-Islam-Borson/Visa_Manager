import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: number | string;
  color: string;
  icon: LucideIcon;
}

const StatCard = ({
  title,
  value,
  color,
  icon: Icon,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}
        >
          <Icon className="text-white" size={28} />
        </div>

      </div>

    </div>
  );
};

export default StatCard;