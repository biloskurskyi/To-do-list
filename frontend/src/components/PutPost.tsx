import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../API/api.tsx";

interface PostTypeChoice {
    0: string;
    1: string;
}

interface PostData {
    title: string;
    post_type: string;
}

const PutPost: React.FC = () => {
    const {id} = useParams();
    const [formData, setFormData] = useState({
        title: '',
        post_type: '',
    });
    const [postTypeChoices, setPostTypeChoices] = useState<PostTypeChoice[]>([]);
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        fetchPostTypeChoices();
        fetchPostData();
    }, []);

    const fetchPostTypeChoices = async ():Promise<void> => {
        try {
            const response = await axiosInstance.get<PostTypeChoice[]>('/post-type-choices/');
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


    const fetchPostData = async ():Promise<void> => {
        try {
            const response = await axiosInstance.get(`/post/${id}/`);
            setFormData({
                title: response.data.title,
                post_type: response.data.post_type,
            });
        } catch (error) {
            console.error('Error fetching post data:', error.message);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>):void => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>):Promise<void> => {
        event.preventDefault();
        try {
            const postData = {
                title: formData.title,
                post_type: formData.post_type,
            };
            const response = await axiosInstance.put(`/post/${id}/`, postData);
            console.log('Post updated:', response.data);
            navigate("/usertodolist");
        } catch (error) {
            console.error('There was an error updating the post:', error);
        }
    };


    return (
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
                {postTypeChoices.map(choice => (
                    <option key={choice[0]} value={choice[0]}>{choice[1]}</option>
                ))}
            </select>
            <button type="submit" className="open-page" style={{backgroundColor: '#5897fb'}}>
                Update post
            </button>
        </form>
    );
};

export default PutPost;