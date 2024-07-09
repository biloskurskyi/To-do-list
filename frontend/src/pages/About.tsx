import React from 'react';
import '/src/styles/App.css'
import {Link} from 'react-router-dom';

const About = () => {
    return (
        <div>
            <header>
                <h1 className="title">To do list can help you to manage your day more effective!</h1>
            </header>
            <div className="main">
                <h2 className="title">To Do List</h2>
                <div className="info-block">
                    <h3 className="info">Please Log in or Sign up in system</h3>
                    <Link to="/login">
                        <button className="button-form">Log In</button>
                    </Link>
                    <Link to="/signup">
                        <button className="button-form">Sign up</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;