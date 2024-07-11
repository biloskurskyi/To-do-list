import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {useParams} from "react-router-dom";

const ActivateUser = () => {
    const {token}: string =  useParams();
    const [activationStatus, setActivationStatus] = useState<string>('Activating...');

    useEffect(():void => {
        const activateUser = async ():Promise<void> => {
            try {
                const response: AxiosResponse<{ message: string }> = await axios.get(`http://localhost:8000/api/activate/${token}/`);
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