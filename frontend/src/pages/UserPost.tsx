import React, {useEffect, useState} from 'react';
import '/src/styles/App.css'
import {Link, useParams} from 'react-router-dom';
import Logout from "../components/Logout.tsx";
import axiosInstance from "../API/api.tsx";
import PostList from "../components/PostList.tsx";
import {request} from "axios";
import DeletePost from "../components/DeletePost.tsx";

const UserPost = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {id} = useParams(); // Get the ID from the URL

    useEffect(() => {
        const fetchToDo = async () => {
            try {
                const response = await axiosInstance.get(`/post/${id}`);
                setPost(response.data);
            } catch (error) {
                setError('Post not found');
            } finally {
                setLoading(false);
            }
        };
        fetchToDo();
    }, [id]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    if (!post) {
        return <h1>Post not found</h1>;
    }

    return (
        <div className="app-page">
            <header>
                <h1 className="title">Your post with id: {id} </h1>
                <div className="create-button">
                    <Link to="/usertodolist">
                        <button>All posts</button>
                    </Link>
                    <Logout/>
                </div>
            </header>
            <div className="main">
                <div className="post-details">
                    <h2 className="post-title">Title: {post.title}</h2>
                    <div className="post-type">Type: {post.post_type_display}</div>
                    <Link to="/usertodolist">
                        <button className="delete-button" style={{backgroundColor: '#5897fb'}}>Update post</button>
                    </Link>
                    <DeletePost postId={id}/>
                </div>
            </div>
            <footer>
                <h1 className="title">Footer</h1>
            </footer>
        </div>
    );
};

export default UserPost;