import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8">

      {/* Left Side */}

      <div>

        <h1 className="text-2xl font-bold text-slate-800">
          Visa Management System
        </h1>

        <p className="text-sm text-gray-500">
          Manage all visa records efficiently
        </p>

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-4">

        <div className="text-right">

          <h4 className="font-semibold text-slate-800">
            {user?.name}
          </h4>

          <p className="text-sm text-gray-500">
            {user?.role}
          </p>

        </div>

        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            user?.name || "User"
          )}&background=2563eb&color=fff&size=128`}
          alt="Profile"
          className="w-11 h-11 rounded-full border-2 border-blue-500"
        />

      </div>

    </header>
  );
};

export default Navbar;