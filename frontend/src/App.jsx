import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import './index.css'; // This should match your CSS file name

import Home from "./components/Home.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import AdminDashboard from "./components/AdminPanel/AdminDashboard.jsx";
import About from "./components/About.jsx";
import RegisterArtisan from "./components/RegisterArtisan.jsx";
import uploadProduct from "./components/uploadProduct.jsx";
const App=()=>{
    return(
        <div>
            <BrowserRouter>
            
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/admin" element={<AdminDashboard/>}></Route>
               
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
