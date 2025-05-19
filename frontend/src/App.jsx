import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import Nav from "./components/Nav.jsx";
import Admin from "./components/Admin.jsx"

const App=()=>{
    return(
        <div>
            <BrowserRouter>
            <Nav/>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                
                <Route path="/Signup" element={<Signup/>}></Route>
                
                <Route path="/Login" element={<Login/>}></Route>

                <Route path="/Admin" element={<Admin/>}></Route>

            </Routes>
            </BrowserRouter>
        </div>
    )
}
export default App;
