import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";

const ActivateUser = () => {
    const {token}: string = useParams();
    const [activationStatus, setActivationStatus] = useState('Activating...');

    useEffect(() => {
        const activateUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/activate/${token}/`);
                setActivationStatus(response.data.message);
            } catch (error) {
                console.error('Error activating user:', error);
                setActivationStatus('Error activating user');
            }
        };

        activateUser();
    }, [token]);

    return (
        activationStatus
    );
};
export default ActivateUser;