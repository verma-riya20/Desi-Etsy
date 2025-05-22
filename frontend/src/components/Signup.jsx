import React, { useState } from "react";
import { Menu, ShoppingCart, Search } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/v1/users/register",
      { ...formData },
      {
        withCredentials: true,
      }
    );

    if (res.status === 201 || res.status === 200) {
      alert("Registration successful!");
      navigate("/login"); // go to login page
    } else {
      alert(res.data?.message || "Registration failed");
    }
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div className="bg-[#F4F3EE] text-[#1B1B1B] font-serif min-h-screen">
     
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
        <div className="flex items-center space-x-2">
          <span className="text-3xl font-extrabold tracking-widest text-[#B68973] drop-shadow-sm select-none"
            style={{ letterSpacing: "0.2em", fontFamily: "serif" }}>
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
          <Search className="w-5 h-5" />
          <ShoppingCart className="w-5 h-5" />
          <Menu className="md:hidden w-5 h-5" />
        </div>
      </header>

     
      <section className="p-6 md:p-12 flex justify-center items-center">
        <div className="bg-white p-8 rounded-md shadow-lg w-full md:w-[400px]">
          <h2 className="text-2xl font-semibold mb-4 text-center">Create Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
              />
            </div>

            <button type="submit" className="w-full bg-[#B68973] text-white py-2 px-4 rounded-md font-semibold hover:bg-[#9f7a56] transition">
              Sign Up
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/Login" className="text-[#B68973] font-medium hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
