import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/users/login`, formData);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="flex justify-center items-center mt-20">
        <div className="card w-96 bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold mb-2">Login</h2>
            <p className="text-sm opacity-70 mb-4">Enter your credentials below</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full"
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered w-full"
                onChange={handleChange}
              />

              <button type="submit" className="btn btn-primary w-full mt-2">
                Login
              </button>
            </form>

            <p className="text-sm mt-3 text-center">
              Need an account?{" "}
              <span
                className="text-primary cursor-pointer hover:underline"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
