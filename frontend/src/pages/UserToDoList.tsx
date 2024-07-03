import React from 'react';
import '/src/styles/App.css'
import { Link } from 'react-router-dom';

const UserToDoList = () => {
    return (
        <div className="app-page">
            <header>
                <h1 className="title">To Do List *user</h1>
                <div className="create-button">
                    <Link to="/createpost"><button>Create post</button></Link>
                    <Link to="/login"><button style={{backgroundColor: '#e1564a'}}>Log out</button></Link>
                </div>
            </header>
            <div className="main">
                <div className="list-block">
                    <ul className="task-list">
                        <li className="task-item">
                            <div className="title-db">Title: *Title 1ggggggggggggggggggggggggggggggggggggggggggg</div>
                            <div className="type-db">Type: *0</div>
                            <Link to="/userpost/:id"><button className="open-page">Open page</button></Link>
                        </li>
                        <li className="task-item">
                            <div className="title-db">Title: *Title 2ggggggggggggggggggggggggggggggggggggggggggg</div>
                            <div className="type-db">Type: *0</div>
                            <Link to="/userpost/:id"><button className="open-page">Open page</button></Link>
                        </li>

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