import React from "react";
import { Link } from "react-router-dom";
import '../CSS/Nav.css';

const Nav = () => {
    return (
        <div>
            <nav className="navbar">
                <h1 className="navbar-title">Desi-Etsy</h1>
                <ul className="nav-links">
                    <li>
                        <Link to="/" className="nav-item">Home</Link>
                    </li>
                    <li>
                        <Link to="/Signup" className="nav-item">Signup</Link>
                    </li>
                    <li>
                        <Link to="/Login" className="nav-item">Login</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Nav;