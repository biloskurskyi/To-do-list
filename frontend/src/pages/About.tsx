import React from 'react';
import '/src/styles/App.css'

const About = () => {
    return (
        <div className="app-page">
            <header>
                <h1 className="title">To do list can help you to manage your day more effective!</h1>
            </header>
            <div className="main">
                <h2 className="title">To Do List</h2>
                <div className="info-block">
                    <h3 className="info">Please Log in or Sign up in system</h3>
                    <button className="button-form">Log In</button>
                    <button className="button-form">Sign up</button>
                </div>
            </div>
            <footer>
                <h1 className="title">Footer</h1>
            </footer>
        </div>
    );
};

export default About;