import React from 'react';
import '/src/styles/App.css'
import {Link, useParams} from 'react-router-dom';
import Logout from "../components/Logout.tsx";
import DeletePost from "../components/DeletePost.tsx";
import useFetchPost from "../hooks/useFetchPost.tsx";

const UserPost = () => {
    const { id } = useParams();
    const { post, loading, error } = useFetchPost(id);

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
                    <Link to={`/updatepost/${id}`}>
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