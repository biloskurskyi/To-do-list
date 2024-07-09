import React from 'react';
import {Link} from "react-router-dom";
import PutPost from "../components/PutPost.tsx";

const UpdatePost = () => {
    return (
        <div>
            <header>
                <h1 className="title">To do list can help you to manage your day more effective!</h1>
            </header>
            <div className="main" style={{height: '510px'}}>
                <h2 className="title">To Do List</h2>
                <div className="info-block">
                    <h3 className="info">Please Log in or Sign up in system</h3>
                    <PutPost/>
                    <div className="button-container">
                        <Link to="/usertodolist">
                            <button className="open-page" style={{backgroundColor: '#dc8916'}}>All posts</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePost;