import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { loginUser } from "../services/userService";
import { loginSchema } from "../validations/userSchema";
import toast from "react-hot-toast";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import "../components/styles/UserRegistrationForm.css";
import { useAuth } from "../contexts/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { user, login, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      // Check if user is admin
      if (user.isAdmin) {
        navigate("/superadmin-dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { message, token, user } = await loginUser(data);
      toast.success(message);

      // Save token and user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Update context
      login(user);

      reset();

      // Conditional navigation based on admin flag
      if (user.isAdmin) {
        navigate("/superadmin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMessage = typeof error === "string" ? error : error.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <h2 className="registration-title">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
        <InputField
          name="email"
          control={control}
          label="Email"
          error={errors.email?.message}
        />
        <InputField
          name="password"
          control={control}
          label="Password"
          type="password"
          error={errors.password?.message}
        />
        <button
          type="submit"
          className="registration-button"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
