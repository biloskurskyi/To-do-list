// components/Layout.tsx
import React from 'react';
import '../../styles/App.css';

const Layout = ({ children }) => {
    return (
        <div className="app-page">
            <header>
                <h1 className="title">To do list can help you to manage your day more effective!</h1>
            </header>
            <div className="main">
                {children}
            </div>
            <footer>
                <h1 className="title">Footer</h1>
            </footer>
        </div>
    );
};

export default Layout;
