import React from 'react';

const UserPost = () => {
    return (
        <div className="app-page">
            <header>
                <h1 className="title">To Do List *user</h1>
                <div className="create-button">
                    <button>All posts</button>
                    <button style={{backgroundColor: '#e1564a'}}>Log out</button>
                </div>
            </header>
            <div className="main">
                <div className="post-details">
                    <h2 className="post-title">Title: *Title 1 ffffffffffffffffffffffffffffffff fffffffffffffffffff</h2>
                    <div className="post-type">Type: *0</div>
                    <button className="delete-button">Delete post</button>
                </div>
            </div>
            <footer>
                <h1 className="title">Footer</h1>
            </footer>
        </div>
    );
};

export default UserPost;