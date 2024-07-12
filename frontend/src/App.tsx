import './styles/App.css'
import {useEffect} from "react";
import {Outlet} from "react-router-dom";

function App() {

    useEffect(():void => {
        document.title = "To do list";
    }, []);


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
