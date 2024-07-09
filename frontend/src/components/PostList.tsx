import React from 'react';
import {useNavigate} from "react-router-dom";

const PostList = ({posts}) => {
    const navigate = useNavigate();

    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center', color: '#f20707', fontFamily: 'Arial, Helvetica, sans-serif'}}>Posts were not found</h1>
        )
    }

    const handleOpenPage = (id) => {
        navigate(`/userpost/${id}`);
    };

    return (
        <ul className="task-list">
            {posts.map(post => (
                <li key={post.id} className="task-item">
                    <div className="title-db">Title: {post.title}</div>
                    <div className="type-db">Type: {post.post_type_display}</div>
                    <button className="open-page" onClick={() => handleOpenPage(post.id)}>Open page</button>
                </li>
            ))}
        </ul>
    );
};

export default PostList;