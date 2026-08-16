import { useForm } from "react-hook-form";
import { loginApi } from "../../services/authApi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type LoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<LoginData>();

  const { login } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await loginApi(data);

      await login(res.data.token);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm rounded-lg bg-white p-8 shadow-lg"
      >
        <h1 className="mb-6 text-center text-3xl font-bold">
          Visa Manager
        </h1>

        <input
          {...register("email")}
          placeholder="Email"
          className="mb-4 w-full rounded border p-3"
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded border p-3"
        />

        <button
          className="w-full rounded bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;