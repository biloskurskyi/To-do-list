import React from 'react';
import {Link, NavigateFunction, useNavigate} from "react-router-dom";

const Logout = () => {
    const navigate:NavigateFunction = useNavigate();
    const handleLogout = (): void => {
        localStorage.removeItem("jwtToken")
        navigate("/login")
    }

    return (
        <button style={{backgroundColor: '#e1564a'}} onClick={handleLogout}>Log out</button>
    );
};

export default Logout;