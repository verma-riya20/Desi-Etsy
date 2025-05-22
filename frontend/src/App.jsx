import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import './index.css'; // This should match your CSS file name

import ProductPage from './components/ProductPage';
import Home from "./components/Home.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import AdminDashboard from "./components/AdminPanel/AdminDashboard.jsx";
import RegisterArtisan from "./components/RegisterArtisan.jsx";
import uploadProduct from "./components/uploadProduct.jsx";
import About from "./components/About.jsx";
import SearchPage from "./components/SearchPage.jsx";
const App=()=>{
    return(
        <div>
            <BrowserRouter>
            
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/admin" element={<AdminDashboard/>}></Route>
                <Route path="/seller" element={<RegisterArtisan/>}></Route>
                <Route path="/upload-product" element={<uploadProduct/>}></Route>

                <Route path="/Products" element={<ProductPage />}></Route>
               
                <Route path="/Signup" element={<Signup/>}></Route>
                <Route path="/Login" element={<Login/>}></Route>
                <Route path="/About" element={<About/>}></Route>
                <Route path="/search" element={<SearchPage />}></Route>
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
