import React, {useEffect, useState} from 'react';
import ActivateUser from "../components/ActivateUser.tsx"
import {Link} from "react-router-dom";

const ActivationStatus = () => {
    const activationStatus: string = ActivateUser();
    return (
        <div>
            <div className="app-page">
                <header>
                    <h1 className="title">To do list can help you to manage your day more effective!</h1>
                </header>
                <div className="main">
                    <h2 className="title">Activation Status</h2>
                    <div className="info-block">
                        <h2 className="info">{activationStatus}</h2>
                        <Link to="/login">
                            <button className="button-form">Log In</button>
                        </Link>
                        {/*<Link to="/signup">*/}
                        {/*    <button className="button-form" style={{backgroundColor: '#5897fb'}}>Sign up</button>*/}
                        {/*</Link>*/}
                        <Link to="/about">
                            <button className="button-form" style={{backgroundColor: '#dc8916'}}>About</button>
                        </Link>
                    </div>
                </div>
                <footer>
                    <h1 className="title">Footer</h1>
                </footer>
            </div>
        </div>
    );
};
export default ActivationStatus;