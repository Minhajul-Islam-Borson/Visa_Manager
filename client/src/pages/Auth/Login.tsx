import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginApi } from "../../services/authApi";
import { useAuth } from "../../context/AuthContext";


type LoginData = {
  email: string;
  password: string;
};


const Login = () => {

  const {
    register,
    handleSubmit,
  } = useForm<LoginData>();

  const {
    login,
  } = useAuth();


  const navigate = useNavigate();


  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);



  const onSubmit = async (data: LoginData) => {

    try {

      setLoading(true);


      const res = await loginApi(data);


      await login(
        res.data.token
      );


      toast.success(
        "Welcome back!"
      );


      navigate("/dashboard");


    } catch(error:any){

      toast.error(
        error.response?.data?.message ||
        "Invalid email or password"
      );

    }
    finally{

      setLoading(false);

    }

  };



  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">


      {/* Background Shapes */}

      <div className="absolute w-96 h-96 bg-white/10 rounded-full -top-20 -left-20 blur-3xl"></div>

      <div className="absolute w-96 h-96 bg-purple-300/20 rounded-full -bottom-20 -right-20 blur-3xl"></div>



      {/* Login Card */}

      <div className="relative w-full max-w-md">


        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
          bg-white/20
          backdrop-blur-xl
          border
          border-white/30
          shadow-2xl
          rounded-3xl
          p-8
          text-white
          "
        >


          {/* Logo */}

          <div className="flex justify-center mb-6">

            <div className="
              bg-white
              text-blue-600
              p-4
              rounded-2xl
              shadow-lg
            ">

              <ShieldCheck size={40}/>

            </div>

          </div>



          <h1 className="
            text-3xl
            font-bold
            text-center
            mb-2
          ">
            Visa Manager
          </h1>


          <p className="
            text-center
            text-blue-100
            mb-8
          ">
            Sign in to manage visa records
          </p>




          {/* Email */}

          <div className="mb-5">

            <label className="text-sm font-medium">
              Email
            </label>


            <div className="
              mt-2
              flex
              items-center
              bg-white/20
              rounded-xl
              px-4
            ">

              <Mail size={20}/>


              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className="
                w-full
                bg-transparent
                outline-none
                px-3
                py-3
                placeholder:text-blue-100
                "
              />

            </div>

          </div>





          {/* Password */}

          <div className="mb-8">

            <label className="text-sm font-medium">
              Password
            </label>


            <div className="
              mt-2
              flex
              items-center
              bg-white/20
              rounded-xl
              px-4
            ">


              <Lock size={20}/>


              <input

                {...register("password")}

                type={
                  showPassword
                  ? "text"
                  : "password"
                }

                placeholder="Enter your password"

                className="
                w-full
                bg-transparent
                outline-none
                px-3
                py-3
                placeholder:text-blue-100
                "

              />


              <button

                type="button"

                onClick={() =>
                  setShowPassword(!showPassword)
                }

              >

                {
                  showPassword
                  ?
                  <EyeOff size={20}/>
                  :
                  <Eye size={20}/>
                }

              </button>


            </div>


          </div>





          {/* Login Button */}

          <button

            disabled={loading}

            className="
            w-full
            py-3
            rounded-xl
            bg-white
            text-blue-700
            font-bold
            shadow-lg
            hover:scale-[1.02]
            transition-all
            duration-300
            disabled:opacity-60
            "

          >

            {
              loading
              ?
              "Signing in..."
              :
              "Login"
            }


          </button>



        </form>


      </div>


    </div>

  );

};


export default Login;