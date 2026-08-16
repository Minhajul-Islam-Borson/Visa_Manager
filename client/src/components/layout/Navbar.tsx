import { Bell, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8">

      <div className="relative w-96">

        <Search
          size={18}
          className="absolute left-4 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search passport or name..."
          className="w-full rounded-xl border border-gray-300 py-2 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <div className="flex items-center gap-6">

        <button className="relative">

          <Bell size={24} />

          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        <div className="text-right">

          <h4 className="font-semibold">
            {user?.name}
          </h4>

          <p className="text-sm text-gray-500">
            {user?.role}
          </p>

        </div>

        <img
          src={`https://ui-avatars.com/api/?name=${user?.name}&background=2563eb&color=fff`}
          alt="avatar"
          className="w-11 h-11 rounded-full"
        />

      </div>

    </header>
  );
};

export default Navbar;