import './styles/App.css'
import React, {useState} from "react";
import About from "./pages/About.tsx";
import {router} from './router/router.tsx';
import {Outlet, RouterProvider} from "react-router-dom";

function App() {

    // const [headerContent, setHeaderContent] = useState();

    return (
        <div className="app-page">
            <div>
                <Outlet/>
            </div>
            <footer>
                <h1 className="title">Footer</h1>
            </footer>
        </div>
    );
}

export default App
