import React from 'react';

const Header = ({posts}) => {
    if (!posts || !posts.length) {
        return <h1 className="title">Create your first post</h1>;
    } else {
        const { author } = posts[0];
        console.log(author)
        console.log(author.name)
        const authorName = posts[0].author_name;
        const authorEmail = posts[0].author_email;

        return (
            <div>
                <h1 className="title">To Do List for {authorName} with email {authorEmail}</h1>
            </div>
        );
    }
};

export default Header;
