import React, {useState} from 'react';
import axios from 'axios';
import '/src/styles/App.css'
import {Link} from 'react-router-dom';

const LogIn = () => {
    // const [formData, setFormData] = useState(
    //     {
    //         name: '',
    //         email: '',
    //         password: ''
    //     }
    // );
    //
    // const handleChange = (event) => {
    //     const {name, value} = event.target;
    //     setFormData({...formData, [name]: value});
    // };
    //
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //
    //     try {
    //         const response = await axios.post('http://localhost:8080/api/register/', formData)
    //         console.log(response.data)
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
    };


    return (
        <div className="app-page">
            <header>
                <h1 className="title">To do list can help you to manage your day more effective!</h1>
            </header>
            <div className="main">
                <h2 className="title">To Do List</h2>
                <div className="info-block">
                    <h3 className="info">Please Log in or Sign up in system</h3>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label className="info">Email:</label>
                        <input type="email" id="email" name="email" required/>
                        <label className="info">Password:</label>
                        <input type="password" id="password" name="password" required/>
                        <Link to="/usertodolist">
                            <button className="open-page">Log In</button>
                        </Link>
                    </form>
                    <div className="button-container">
                        <Link to="/signup">
                            <button className="open-page" style={{backgroundColor: '#5897fb'}}>Sign Up</button>
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

export default LogIn;