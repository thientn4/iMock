import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from './pages/login'
import Home from './pages/home'

const Content = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
            </Routes>
        </div>
    );
}

export default Content;