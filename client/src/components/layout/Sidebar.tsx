import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  BarChart3,
  Users,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    exact: true,
  },
  {
    title: "Visa List",
    icon: FileText,
    path: "/visa",
    exact: true,
  },
  {
    title: "Add Visa",
    icon: PlusCircle,
    path: "/visa/add",
    exact: true,
  },
  {
    title: "Reports",
    icon: BarChart3,
    path: "/reports",
    exact: true,
  },
  {
    title: "Users",
    icon: Users,
    path: "/users",
    exact: true,
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
    exact: true,
  },
];

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="w-72 h-screen bg-gradient-to-b from-blue-700 via-blue-600 to-indigo-700 text-white flex flex-col shadow-xl">

      {/* Logo */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="bg-white text-blue-700 p-3 rounded-xl">
            <ShieldCheck size={28} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Visa Manager
            </h2>

            <p className="text-sm text-blue-100">
              Management System
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-5 space-y-2">

        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-white text-blue-700 shadow-lg"
                    : "hover:bg-white/20"
                }`
              }
            >
              <Icon size={22} />

              <span className="font-medium">
                {item.title}
              </span>
            </NavLink>
          );
        })}

      </nav>

      {/* User */}
      <div className="border-t border-white/20 p-5">

        <div className="mb-4">
          <h4 className="font-semibold">
            {user?.name}
          </h4>

          <p className="text-sm text-blue-100">
            {user?.role}
          </p>
        </div>

        <button
          onClick={logout}
          className="flex items-center justify-center gap-3 w-full bg-red-500 hover:bg-red-600 transition rounded-xl px-4 py-3"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;