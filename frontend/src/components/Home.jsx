import React, { useState } from "react";
import { Menu, ShoppingCart } from "lucide-react"; // <-- added Search import
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

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
          <a href="seller-cards">Sellers</a>
          <a href="/Products">Products</a>
          <Link to="/About">About</Link>
          <a href="/admin">Admin</a>
         
        </nav>

        {/* SEARCH INPUT + ICON + CART + MENU + SIGNUP BUTTON */}
        <div className="flex items-center space-x-4">
          {/* Search input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="px-2 py-1 border rounded-md text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          {/* Search icon button 
          <button onClick={handleSearch} aria-label="Search">
            <Search className="w-5 h-5 text-gray-800 cursor-pointer" />
          </button>*/}

          <ShoppingCart className="w-5 h-5" />
          <Menu className="md:hidden w-5 h-5" />
          <Link to="/Signup">
            <button className="ml-4 px-4 py-1 border border-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition">
              SignUp
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-6 p-6 md:p-12 items-center">
        <img
          src="/artisan.jpg"
          alt="Artisan crafting"
          className="w-70% rounded-md object-cover h-[250px] md:h-[420px]"
        />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight ">
            WELCOME TO KARIGARHAAT,
          </h1>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-gray-600 ">
            WHERE ARTISANS BRING PASSION TO THE WORLD.
          </h1>
          <p className="text-sm mt-4 text-gray-700 leading-relaxed">
            Discover, connect, and support skilled artisans from across the
            country. Whether you're looking for handmade goods or want to sell
            your creations, we are here to empower creativity and craftsmanship.
          </p>
          <div className="mt-4 flex items-center space-x-3">
            <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
          </div>
        </div>
      </section>

      {/* Mid Image Banner */}
      <section className="p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src="/handicraftitems.png"
            alt="Handmade artisan product 1"
            className="rounded-md w-60% object-cover h-[320px] md:h-[420px]"
          />
          <img
            src="/handicraftitems.webp"
            alt="Handmade artisan product 2"
            className="rounded-md w-60% object-cover h-[320px] md:h-[420px]"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-2 gap-6 p-6 md:p-12 items-start">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="bg-white p-4 border rounded-md shadow-sm flex-1">
              <h3 className="text-sm font-semibold mb-1">
                <a href="/seller">Become a seller</a>
              </h3>
              <p className="text-xs text-gray-600">
                Share your handmade creations with a wider audience and grow your
                small business with zero hassle.
              </p>
            </div>
            <div className="bg-white p-4 border rounded-md shadow-sm flex-1">
              <h3 className="text-sm font-semibold mb-1">Connect With Artisans</h3>
              <p className="text-xs text-gray-600">
                Discover beautiful, authentic crafts and stories behind every item
                — from textiles to ceramics and more.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">
            A Marketplace Built for Artisans
          </h2>
          <p className="text-sm text-gray-700">
            Rustic & Wild is more than just a platform. It's a movement to empower
            local makers by giving them visibility, tools, and a thriving
            community.
          </p>
          <button className="mt-2 px-6 py-2 border border-gray-900 text-sm hover:bg-gray-900 hover:text-white transition w-max">
            Explore Marketplace
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;