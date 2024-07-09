import React, {useEffect, useState} from 'react';
import axios from 'axios';
import axiosInstance from "../API/api.tsx";
import {useParams} from "react-router-dom";

const ActivateUser = () => {
    const {userId} = useParams();
    const [activationStatus, setActivationStatus] = useState('Activating...');

    useEffect(() => {
        const activateUser = async () => {
            try {
                console.log(userId)
                const response = await axiosInstance.get(`/activate/${userId}/`);
                setActivationStatus(response.data.message);
            } catch (error) {
                console.error('Error activating user:', error.message);
                setActivationStatus('Error activating user');
            }
        };

        activateUser();
    }, [userId]);

    return (
        <div>
            <h2>Activation Status</h2>
            <p>{activationStatus}</p>
        </div>
    );
};
export default ActivateUser;