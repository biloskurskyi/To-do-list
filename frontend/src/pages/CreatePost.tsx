import React, {useEffect, useState} from 'react';
import '/src/styles/App.css'
import {Link, useNavigate} from 'react-router-dom';
import axiosInstance from "../API/api.tsx";

const CreatePost = () => {

    const [formData, setFormData] = useState(
        {
            title: '',
            post_type: '',
        }
    );
    const [postTypeChoices, setPostTypeChoices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPostTypeChoices();
    }, []);

    const fetchPostTypeChoices = async () => {
        try {
            const response = await axiosInstance.get('/post-type-choices/');
            setPostTypeChoices(response.data);
        } catch (error) {
            console.error('Error fetching post type choices:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            } else if (error.request) {
                console.error('Request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };


    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(formData.post_type)
            const postData = {
                title: formData.title,
                post_type: formData.post_type, // Convert to number here
            };
            console.log(postData)
            const response = await axiosInstance.post('/posts/', postData);
            console.log('Post created:', response.data);
            navigate("/usertodolist")
        } catch (error) {
            console.error('There was an error creating the post:', error.message);
        }
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
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
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
            <footer>
                <h1 className="title">Footer</h1>
            </footer>
        </div>
    )
};

export default CreatePost;