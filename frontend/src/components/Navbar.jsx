// --- frontend/src/components/Navbar.jsx ---
// A simple navigation bar
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { useAuth } from '../context/AuthContext'; // Ensure correct path
import { ShoppingCart, Menu } from 'lucide-react'; // Import icons if used in Navbar

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate(); // Use the useNavigate hook here

    const handleLogout = () => {
        logout();
        navigate('/Login'); // Redirect to login after logout using React Router path
    };

    return (
        <nav className="bg-blue-600 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div
                    className="text-white text-2xl font-bold cursor-pointer"
                    onClick={() => navigate('/')} // Navigate to home path
                >
                    Desi-Etsy
                </div>
                <div className="space-x-4">
                    <Link to="/" className="text-white hover:text-blue-200 transition duration-200">
                        Home
                    </Link>
                    {/* You might want to add actual routes for Sellers and Products here */}
                    <Link to="/Products" className="text-white hover:text-blue-200 transition duration-200">Products</Link>
                    <Link to="/About" className="text-white hover:text-blue-200 transition duration-200">About</Link>

                    {user ? (
                        <>
                            {user.role === 'artisan' && (
                                <>
                                    <Link to="/seller" className="text-white hover:text-blue-200 transition duration-200">
                                        My Artisan Profile
                                    </Link>
                                    <Link to="/upload-product" className="text-white hover:text-blue-200 transition duration-200">
                                        Upload Product
                                    </Link>
                                </>
                            )}
                            {user.role === 'admin' && (
                                <Link to="/admin" className="text-white hover:text-blue-200 transition duration-200">
                                    Admin Dashboard
                                </Link>
                            )}
                            <span className="text-white mr-2">Hello, {user.name} ({user.role})</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg transition duration-200"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/Login" className="text-white hover:text-blue-200 transition duration-200">
                                Login
                            </Link>
                            <Link to="/Signup" className="text-white hover:text-blue-200 transition duration-200">
                                Sign Up
                            </Link>
                        </>
                    )}
                    {/* Assuming ShoppingCart and Menu icons are still desired in Navbar */}
                    <ShoppingCart className="w-5 h-5 text-white" />
                    <Menu className="md:hidden w-5 h-5 text-white" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
