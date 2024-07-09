import React, {useState, useEffect} from 'react';
import '/src/styles/App.css'
import {Link,} from 'react-router-dom';
import axiosInstance from '../API/api.tsx'
import PostList from "../components/PostList.tsx";
import Header from "../components/Header.tsx";
import Logout from "../components/Logout.tsx";
import MyModal from "../components/UI/MyModal/MyModal.tsx";
import DeleteUser from "../components/DeleteUser.tsx";

const UserToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [modal, setModal] = useState(false);

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
        <div>
            <header>
                <Header posts={todos}/>
                <div className="create-button">
                    <Link to="/createpost">
                        <button>Create post</button>
                    </Link>
                    <Logout/>
                    <button style={{backgroundColor: '#c90e07'}} onClick={() => setModal(true)}>Delete account</button>
                    {/*<DeleteUser/>*/}
                </div>
            </header>
            <div className="main">
                <div className="list-block">
                    <PostList posts={todos}/>
                    <MyModal visible={modal} setVisible={setModal}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <h1 className="post-title">Are you sure?</h1>
                            <DeleteUser/>
                        </div>
                    </MyModal>
                </div>
            </div>
        </div>
    );
};

export default UserToDoList;