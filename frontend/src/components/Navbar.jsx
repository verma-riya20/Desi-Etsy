// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Menu } from "lucide-react";



const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-300 bg-[#F4F3EE] text-[#1B1B1B] font-serif">
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
        <a href="/Products">Products</a>
        <Link to="/About">About</Link>
        <a href="/admin">Admin</a>
        <Link to="/Login">Login</Link>
      </nav>

      <div className="flex items-center space-x-4">
        <Search className="w-5 h-5" />
        <ShoppingCart className="w-5 h-5" />
        <Menu className="md:hidden w-5 h-5" />
        <Link to="/Signup">
          <button className="ml-4 px-4 py-1 border border-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition">
            SignUp
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
