import { Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface Props {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: Props) => {
  const { user } = useAuth();

  return (
    <header
      className="
      min-h-20
      bg-white
      shadow-sm
      flex
      items-center
      justify-between
      gap-3
      px-4
      sm:px-8
    "
    >
      {/* Left */}

      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <button
          onClick={onMenuClick}
          className="
            p-2
            rounded-lg
            hover:bg-gray-100
            transition
          "
        >
          <Menu size={26} />
        </button>

        <div>
          <h1
            className="
            text-lg
            sm:text-2xl
            font-bold
            text-blue-700
          "
          >
            Visa Manager
          </h1>

          <p className="hidden text-sm text-gray-500 sm:block">
            Management System
          </p>
        </div>
      </div>

      {/* Right */}

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <div className="hidden text-right sm:block">
          <h4 className="font-semibold text-slate-800">{user?.name}</h4>

          <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
        </div>

        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            user?.name || "User",
          )}&background=2563eb&color=fff`}

          alt="Profile"

          className="
            h-9
            w-9
            sm:h-11
            sm:w-11
            rounded-full
            border-2
            border-blue-500
          "
        />
      </div>
    </header>
  );
};

export default Navbar;
