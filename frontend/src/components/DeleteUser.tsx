import React from 'react';
import {NavigateFunction, useNavigate} from "react-router-dom";
import axiosInstance from "../API/api.tsx";

const DeleteUser = () => {
    const navigate:NavigateFunction = useNavigate();

    const handleDelete = async ():Promise<void> => {
        try {

            await axiosInstance.delete(`http://localhost:8000/api/delete/`)
            navigate("/about")
        } catch (error) {
            console.error('There was an error deleting the post:', error.message);
        }
    }


    return (
        <button style={{backgroundColor: '#c90e07', marginLeft: '10px', color: 'white'}} onClick={handleDelete}>Delete account</button>
    );
};

export default DeleteUser;