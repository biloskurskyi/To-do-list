import React, {useState, useEffect} from 'react';
import '/src/styles/App.css'
import {Link, useNavigate} from 'react-router-dom';
import axiosInstance from '../API/api.tsx'
import PostList from "../components/PostList.tsx";
import Header from "../components/Header.tsx";

const UserToDoList = () => {
    const [todos, setTodos] = useState([]);
    // const navigate = useNavigate()
    // const [error, setError] = useState();

    useEffect(() => {
        const fetchToDos = async () => {
            try {
                const response = await axiosInstance.get('/posts/');
                setTodos(response.data);
                console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchToDos();
    }, []);


    return (
        <div className="app-page">
            <header>
                <Header posts={todos}/>
                <div className="create-button">
                    <Link to="/createpost">
                        <button>Create post</button>
                    </Link>
                    <Link to="/login">
                        <button style={{backgroundColor: '#e1564a'}}>Log out</button>
                    </Link>
                </div>
            </header>
            <div className="main">
                <div className="list-block">
                    <ul className="task-list">
                        <PostList posts={todos}/>
                    </ul>
                </div>
            </div>
            <footer>
                <h1 className="title">Footer</h1>
            </footer>
        </div>
    );
};

export default UserToDoList;