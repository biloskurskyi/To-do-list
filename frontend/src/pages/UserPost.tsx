import React from 'react';
import '/src/styles/App.css'
import { Link } from 'react-router-dom';

const UserPost = () => {
    return (
        <div className="app-page">
            <header>
                <h1 className="title">To Do List *user</h1>
                <div className="create-button">
                    <Link to="/usertodolist"><button>All posts</button></Link>
                    <Link to="/login"><button style={{backgroundColor: '#e1564a'}}>Log out</button></Link>
                </div>
            </header>
            <div className="main">
                <div className="post-details">
                    <h2 className="post-title">Title: *Title 1 ffffffffffffffffffffffffffffffff fffffffffffffffffff</h2>
                    <div className="post-type">Type: *0</div>
                    <Link to="/usertodolist"><button className="delete-button">Delete post</button></Link>
                </div>
            </div>
            <footer>
                <h1 className="title">Footer</h1>
            </footer>
        </div>
    );
};

export default UserPost;