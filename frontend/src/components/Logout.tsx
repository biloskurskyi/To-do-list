import React from 'react';
import {Link, useNavigate} from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("jwtToken")
        navigate("/login")
    }

    return (
        <button style={{backgroundColor: '#e1564a'}} onClick={handleLogout}>Log out</button>
    );
};

export default Logout;