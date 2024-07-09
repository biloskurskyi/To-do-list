import React from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import axiosInstance from "../API/api.tsx";

const DeletePost = ({postId}) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {

            await axiosInstance.delete(`http://localhost:8000/api/post/${postId}/`)
            navigate("/usertodolist")
        } catch (error) {
            console.error('There was an error deleting the post:', error.message);
        }
    }


    return (
        <button className="delete-button" onClick={handleDelete}>Delete post</button>
    );
};

export default DeletePost;