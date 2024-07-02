import React from 'react';
import '/src/styles/App.css'

const UserToDoList = () => {
    return (
        <div className="app-page">
            <header>
                <h1 className="title">To Do List *user</h1>
                <div className="create-button">
                    <button>Create post</button>
                    <button style={{backgroundColor: '#e1564a'}}>Log out</button>
                </div>
            </header>
            <div className="main">
                <div className="list-block">
                    <ul className="task-list">
                        <li className="task-item">
                            <div className="title-db">Title: *Title 1ggggggggggggggggggggggggggggggggggggggggggg</div>
                            <div className="type-db">Type: *0</div>
                            <button className="open-page">Open page</button>
                        </li>
                        <li className="task-item">
                            <div className="title-db">Title: *Title 2ggggggggggggggggggggggggggggggggggggggggggg</div>
                            <div className="type-db">Type: *0</div>
                            <button className="open-page">Open page</button>
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