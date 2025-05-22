import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Update form state
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        { ...formData },
        {
          withCredentials: true, // allows cookies to be sent
        }
      );

      if (response.data.success) {
        navigate("/"); // Redirect on success
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="bg-[#F4F3EE] text-[#1B1B1B] font-serif min-h-screen">
      
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
        <div className="flex items-center space-x-2">
          <span
            className="text-3xl font-extrabold tracking-widest text-[#B68973] drop-shadow-sm select-none"
            style={{ letterSpacing: "0.2em", fontFamily: "serif" }}
          >
            KARIGARHAAT
          </span>
        </div>
        <nav className="hidden md:flex space-x-6 text-sm uppercase font-medium">
          <Link to="/">Home</Link>
          <a href="#">Sellers</a>
          <a href="#">Products</a>
          <Link to="/About">About</Link>
          <a href="/admin">Admin</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/signup">
            <button className="ml-4 px-4 py-1 border border-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition">
              SignUp
            </button>
          </Link>
        </div>
      </header>

      
      <section className="p-6 md:p-12 flex justify-center items-center">
        <div className="bg-white p-8 rounded-md shadow-lg w-full md:w-[400px]">
          <h2 className="text-2xl font-semibold mb-4 text-center">Login to Your Account</h2>

          
          {error && (
            <div className="mb-4 text-red-600 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
              />
            </div>

            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
              />
            </div>

            
            <button
              type="submit"
              className="w-full bg-[#B68973] text-white py-2 px-4 rounded-md font-semibold hover:bg-[#9f7a56] transition"
            >
              Login
            </button>
          </form>

          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#B68973] hover:text-[#9f7a56]">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
