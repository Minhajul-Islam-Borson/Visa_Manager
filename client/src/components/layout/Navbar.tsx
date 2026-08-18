import { Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";


interface Props {
  onMenuClick: () => void;
}


const Navbar = ({ onMenuClick }: Props) => {


  const { user } = useAuth();



  return (

    <header className="
      h-20 
      bg-white 
      shadow-sm 
      flex 
      items-center 
      justify-between 
      px-8
    ">


      {/* Left */}

      <div className="flex items-center gap-4">


        <button
          onClick={onMenuClick}
          className="
            p-2
            rounded-lg
            hover:bg-gray-100
            transition
          "
        >

          <Menu size={26}/>

        </button>



        <div>

          <h1 className="
            text-2xl
            font-bold
            text-blue-700
          ">
            Visa Manager
          </h1>


          <p className="text-sm text-gray-500">
            Management System
          </p>


        </div>


      </div>





      {/* Right */}

      <div className="flex items-center gap-4">


        <div className="text-right">


          <h4 className="font-semibold text-slate-800">

            {user?.name}

          </h4>


          <p className="text-sm text-gray-500 capitalize">

            {user?.role}

          </p>


        </div>



        <img

          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            user?.name || "User"
          )}&background=2563eb&color=fff`}

          alt="Profile"

          className="
            w-11
            h-11
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