import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {NavigateFunction, useNavigate} from "react-router-dom";
import axiosInstance from "../API/api.tsx";
import {AxiosResponse} from "axios";

interface FormData {
    title: string;
    post_type: string;
}

interface useCreatePostHook {
    postTypeChoices: string[];
    formData: FormData;
    handleChange;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

const useCreatePost = (): useCreatePostHook => {
    const [formData, setFormData] = useState<FormData>(
        {
            title: '',
            post_type: '',
        }
    );
    const [postTypeChoices, setPostTypeChoices] = useState<string[]>([]);
    const navigate:NavigateFunction = useNavigate();

    useEffect(() => {
        fetchPostTypeChoices();
    }, []);

    const fetchPostTypeChoices = async ():Promise<void> => {
        try {
            const response = await axiosInstance.get<string[]>('/post-type-choices/');
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


    const handleChange = (event: ChangeEvent<HTMLInputElement>):void => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>):Promise<void> => {
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

    return {
        postTypeChoices,
        formData,
        handleChange,
        handleSubmit,
    }
};

export default useCreatePost;