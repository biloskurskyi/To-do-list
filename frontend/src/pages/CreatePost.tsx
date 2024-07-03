import React from 'react';
import '/src/styles/App.css'
import { Link } from 'react-router-dom';

const CreatePost = () => {
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
                        <label className="info">Title:</label>
                        <input type="title" id="title" name="title" required/>
                        <Link to="/usertodolist">
                            <button className="open-page" style={{backgroundColor: '#5897fb'}}>Create</button>
                        </Link>
                    </form>
                    <div className="button-container">
                        <Link to="/usertodolist">
                            <button className="open-page" style={{backgroundColor: '#dc8916'}}>All posts</button>
                        </Link>
                    </div>
                </div>
            </div>
            <footer>
                <h1 className="title">Footer</h1>
            </footer>
        </div>
    )
};

export default CreatePost;