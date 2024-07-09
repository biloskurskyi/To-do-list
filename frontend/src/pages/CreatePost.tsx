import React from 'react';
import '/src/styles/App.css'
import {Link} from 'react-router-dom';
import useCreatePost from "../hooks/useCreatePost.tsx";

const CreatePost = () => {


    const {
        postTypeChoices,
        formData,
        handleChange,
        handleSubmit,
    } = useCreatePost()


    return (
        <div>
            <header>
                <h1 className="title">To do list can help you to manage your day more effective!</h1>
            </header>
            <div className="main" style={{height: '510px'}}>
                <h2 className="title">To Do List</h2>
                <div className="info-block">
                    <h3 className="info">Please Log in or Sign up in system</h3>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label className="info">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            maxLength={255}
                        />
                        <label className="info">Post Type:</label>
                        <select
                            id="post_type"
                            name="post_type"
                            value={formData.post_type}
                            onChange={handleChange}
                            required
                            className="post-type-select"
                        >
                            <option value="">Select post type</option>
                            {postTypeChoices.map(choice => (
                                <option key={choice[0]} value={choice[0]}>{choice[1]}</option>
                            ))}
                        </select>
                        <button type="submit" className="open-page">
                            Create Post
                        </button>
                    </form>
                    <div className="button-container">
                        <Link to="/usertodolist">
                            <button className="open-page" style={{backgroundColor: '#dc8916'}}>All posts</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CreatePost;