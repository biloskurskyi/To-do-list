import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const useLoginForm = () => {
    const [formData, setFormData] = useState(
        {
            email: '',
            password: ''
        }
    )

    const navigate = useNavigate()

    const [error, setError] = useState();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/login/", formData)
            const token = response.data.jwt;
            const userId = response.data.id;
            console.log('id:', userId);

            localStorage.setItem('jwtToken', token);
            localStorage.setItem('userId', userId);
            console.log("Token stored:", token);
            navigate("/usertodolist");
        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                setError('Error: try another email or check your password!');
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

export default useLoginForm;