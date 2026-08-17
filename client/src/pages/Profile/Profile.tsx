import { User, Mail, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto px-8 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Profile
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your account information
        </p>
      </div>


      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8">

        {/* Avatar */}
        <div className="flex items-center gap-5 mb-8">

          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <User
              size={40}
              className="text-blue-600"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {user?.name}
            </h2>

            <p className="text-slate-500">
              {user?.role}
            </p>
          </div>

        </div>


        {/* Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


          {/* Name */}
          <div className="border rounded-xl p-5">

            <div className="flex items-center gap-3 mb-2">
              <User size={20} className="text-blue-600" />

              <h3 className="font-semibold">
                Name
              </h3>
            </div>

            <p className="text-slate-600">
              {user?.name}
            </p>

          </div>



          {/* Email */}
          <div className="border rounded-xl p-5">

            <div className="flex items-center gap-3 mb-2">
              <Mail size={20} className="text-blue-600" />

              <h3 className="font-semibold">
                Email
              </h3>
            </div>

            <p className="text-slate-600">
              {user?.email}
            </p>

          </div>



          {/* Role */}
          <div className="border rounded-xl p-5">

            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck size={20} className="text-blue-600" />

              <h3 className="font-semibold">
                Role
              </h3>
            </div>

            <p className="text-slate-600 capitalize">
              {user?.role}
            </p>

          </div>


        </div>

      </div>

    </div>
  );
};

export default Profile;