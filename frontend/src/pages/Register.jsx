import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Register() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/users/register`, formData);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="flex justify-center items-center mt-20">
        <div className="card w-96 bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold mb-2">Register</h2>
            <p className="text-sm opacity-70 mb-4">Create a new account</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                name="name"
                placeholder="Name"
                className="input input-bordered"
                onChange={handleChange}
              />

              <input
                name="email"
                placeholder="Email"
                className="input input-bordered"
                onChange={handleChange}
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input input-bordered"
                onChange={handleChange}
              />

              <button type="submit" className="btn btn-primary w-full mt-2">
                Register
              </button>
            </form>

            <p className="text-sm mt-3 text-center">
              Already have an account?{" "}
              <span
                className="text-primary cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
