import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from './pages/login'
import Home from './pages/home'
import Account from './pages/account'
import Countdown from './pages/countdown'
import Interview from './pages/interview'

const Content = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="/countdown" element={<Countdown/>}/>
                <Route path="/interview" element={<Interview/>}/>
            </Routes>
        </div>
    );
}

export default Content;