import React from 'react';
import '/src/styles/App.css'
import {Link} from 'react-router-dom';
import useSignUp from "../hooks/useSignUp.tsx";

const SignUp = () => {

    const {formData, error, handleChange, handleSubmit} = useSignUp();

    return (
        <div>
            <header>
                <h1 className="title">To do list can help you to manage your day more effective!</h1>
                {error && <p style={{color: 'red', fontSize: '20px'}}>{error}</p>}
            </header>
            <div className="main" style={{height: '470px'}}>
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
                        <button type="submit" className="open-page" style={{backgroundColor: '#5897fb'}}>Sign Up</button>
                    </form>
                    <div className="button-container" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '10px' }}>
                        <Link to="/login">
                            <button className="open-page">Log In</button>
                        </Link>
                        <Link to="/about">
                            <button className="open-page" style={{backgroundColor: '#dc8916'}}>About page</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;