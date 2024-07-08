import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const UseSignUp = () => {
    const [formData, setFormData] = useState(
        {
            name: '',
            email: '',
            password: ''
        }
    );

    const navigate = useNavigate();

    const [error, setError] = useState();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/register/', formData)
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