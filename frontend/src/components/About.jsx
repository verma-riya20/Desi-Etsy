import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu } from 'lucide-react';  
import img from "/public/img.jpg";

const About = () => {
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
          <Link to ="/">Home</Link>
          <a href="#">Sellers</a>
          <a href="#">Products</a>
          <a href="/admin">Admin</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5" />
          <ShoppingCart className="w-5 h-5" />
          <Menu className="md:hidden w-5 h-5" />
        </div>
      </header>

      {/* About Section */}
      <section className="p-6 md:p-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#B68973] mb-4">Welcome to Desi Etsy</h1>
          <p className="text-xl text-gray-600">
            A Marketplace Celebrating the Art of Handmade Craftsmanship
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission: Empowering Artisans, Celebrating Craftsmanship
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              At **Desi Etsy**, we believe that handmade products have the power to bring people closer
              to the rich culture and creativity of local artisans. Our platform is designed to give
              artisans from all backgrounds the opportunity to showcase their handcrafted goods to a global audience.
            </p>
            <p className="text-sm text-gray-700 mb-4">
              We’re not just about selling products; we’re about telling stories. Every product listed
              on Desi Etsy has a unique story, crafted with love, skill, and passion by artisans who
              pour their heart and soul into their work.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Choose Desi Etsy?
            </h2>
            <ul className="list-disc pl-6 text-sm text-gray-700">
              <li>Support local artisans and help them grow their small businesses</li>
              <li>Discover one-of-a-kind, handmade products that reflect cultural heritage</li>
              <li>Empower artisans with easy-to-use tools to list, manage, and sell their creations</li>
              <li>Buy directly from makers and connect with the stories behind every item</li>
            </ul>
          </div>

          {/* Image Section */}
          <div>
            <img
              src={img} 
              alt="Artisan Crafting"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
        
        {/* Our Values Section */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Core Values</h2>
          <p className="text-sm text-gray-700 mb-8">
            At Desi Etsy, our core values guide every interaction, product listing, and relationship we build.
          </p>
          <div className="flex justify-around flex-wrap">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#B68973] flex justify-center items-center text-white text-xl">
                ❤️
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800">Authenticity</h4>
                <p className="text-sm text-gray-600">We champion real, genuine craftsmanship with stories behind every product.</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#B68973] flex justify-center items-center text-white text-xl">
                🌍
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800">Global Reach</h4>
                <p className="text-sm text-gray-600">We connect artisans to a worldwide marketplace, empowering their craft.</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#B68973] flex justify-center items-center text-white text-xl">
                💡
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800">Innovation</h4>
                <p className="text-sm text-gray-600">We provide artisans with modern tools and resources to grow their businesses.</p>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default About;
