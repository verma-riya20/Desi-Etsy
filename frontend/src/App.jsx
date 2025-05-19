import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import './index.css'; // This should match your CSS file name

import Home from "./components/Home.jsx";

const App=()=>{
    return(
        <div>
            <BrowserRouter>
            
            <Routes>
                <Route path="/" element={<Home/>}></Route>
               
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
