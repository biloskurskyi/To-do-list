import React from 'react';

const Header = ({posts}) => {
    if (!posts || !posts.length) {
        return <h1 className="title">Create your first post</h1>;
    } else {
        const authorName = posts[0].author.name;
        const authorEmail = posts[0].author.email;

        return (
            <div>
                <h1 className="title">To Do List for {authorName} with email {authorEmail}</h1>
            </div>
        );
    }
};

export default Header;
