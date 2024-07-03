import React, {useState} from 'react';
import '/src/styles/App.css'
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

const SignUp = () => {

    const [formData, setFormData] = useState(
        {
            name: '',
            email: '',
            password: ''
        }
    );

    const navigate = useNavigate();

    const [error, setError] = useState();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/register/', formData)
            console.log(response.data)
            navigate("/login");

        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                setError('Error: try another email or check if your data is correct!');
            }
        }
    };

    return (
        <div className="app-page">
            <header>
                <h1 className="title">To do list can help you to manage your day more effective!</h1>
                {error && <p style={{color: 'red', fontSize: '20px'}}>{error}</p>}
            </header>
            <div className="main" style={{height: '510px'}}>
                <h2 className="title">To Do List</h2>
                <div className="info-block">
                    <h3 className="info">Please Log in or Sign up in system</h3>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label className="info">Name:</label>
                        <input type="name" id="name" name="name" value={formData.name} onChange={handleChange}
                               required/>
                        <label className="info">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                               required/>
                        <label className="info">Password:</label>
                        <input type="password" id="password" name="password" value={formData.password}
                               onChange={handleChange} required/>
                        <button className="open-page" style={{backgroundColor: '#5897fb'}}>Sign Up</button>
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