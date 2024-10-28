import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from './pages/login'

const Content = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login/>}/>
            </Routes>
        </div>
    );
}

export default Content;