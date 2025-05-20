import React from "react";
import { Menu, ShoppingCart, Search } from "lucide-react";
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="bg-[#F4F3EE] text-[#1B1B1B] font-serif min-h-screen">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span
            className="text-3xl font-extrabold tracking-widest text-[#B68973] drop-shadow-sm select-none"
            style={{ letterSpacing: "0.2em", fontFamily: "serif" }}
          >
            KARIGARHAAT
          </span>
        </div>
        <nav className="hidden md:flex space-x-6 text-sm uppercase font-medium">
          <a href="#">Home</a>
          <a href="#">Sellers</a>
          <a href="#">Products</a>
          <a href="#">About</a>
          <a href="/admin">Admin</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5" />
          <ShoppingCart className="w-5 h-5" />
          <Menu className="md:hidden w-5 h-5" />
        </div>
      </header>

      {/* Sign Up Form Section */}
      <section className="p-6 md:p-12 flex justify-center items-center">
        <div className="bg-white p-8 rounded-md shadow-lg w-full md:w-[400px]">
          <h2 className="text-2xl font-semibold mb-4 text-center">Create Account</h2>

          <form>
            {/* Username */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#B68973] text-white py-2 px-4 rounded-md font-semibold hover:bg-[#9f7a56] transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
