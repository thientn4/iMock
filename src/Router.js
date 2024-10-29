import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from './pages/login'
import Home from './pages/home'
import Account from './pages/account'

const Content = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/account" element={<Account/>}/>
            </Routes>
        </div>
    );
}

export default Content;