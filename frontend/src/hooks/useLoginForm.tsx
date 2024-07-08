import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

interface LoginData {
    email: string,
    password: string
}

const useLoginForm = () => {
    const [formData, setFormData] = useState<LoginData>(
        {
            email: '',
            password: ''
        }
    )

    const navigate = useNavigate()

    const [error, setError] = useState<string | undefined>();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    }


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post<{ jwt: string; id: number }>("http://localhost:8000/api/login/", formData)
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