import React from 'react';
import '/src/styles/App.css'
import {Link} from 'react-router-dom';

const SignUp = () => {
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents default form submission behavior
        // You can handle form submission logic here, e.g., sending data to backend
        console.log('Form submitted!');
    };

    return (
        <div className="app-page">
            <header>
                <h1 className="title">To do list can help you to manage your day more effective!</h1>
            </header>
            <div className="main" style={{height: '510px'}}>
                <h2 className="title">To Do List</h2>
                <div className="info-block">
                    <h3 className="info">Please Log in or Sign up in system</h3>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label className="info">Name:</label>
                        <input type="name" id="name" name="name" required/>
                        <label className="info">Email:</label>
                        <input type="email" id="email" name="email" required/>
                        <label className="info">Password:</label>
                        <input type="password" id="password" name="password" required/>
                        <Link to="/login">
                            <button className="open-page" style={{backgroundColor: '#5897fb'}}>Sign Up</button>
                        </Link>
                    </form>
                    <div className="button-container">
                        <Link to="/login">
                            <button className="open-page">Log In</button>
                        </Link>
                        <Link to="/about">
                            <button className="open-page" style={{backgroundColor: '#dc8916'}}>About page</button>
                        </Link>
                    </div>
                </div>
            </div>
            <footer>
                <h1 className="title">Footer</h1>
            </footer>
        </div>
    );
};

export default SignUp;