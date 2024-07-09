import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import axiosInstance from "../API/api.tsx";

interface SignUpData {
    name: string,
    email: string,
    password: string
}

const UseSignUp = () => {
    const [formData, setFormData] = useState<SignUpData>(
        {
            name: '',
            email: '',
            password: ''
        }
    );

    const navigate = useNavigate();

    const [error, setError] = useState<string | undefined>();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axiosInstance.post('/register/', formData)
            console.log(response.data)
            navigate("/login");

        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                setError('Error: try another email or check if your data is correct!');
            }
        }
    };

    return {
        formData,
        error,
        handleChange,
        handleSubmit
    };
};

export default UseSignUp;