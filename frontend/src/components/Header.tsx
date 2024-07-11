import React from 'react';

interface Post {
    author: {
        name: string;
        email: string;
    };
}

interface HeaderProps {
    posts: Post[];
}

const Header: React.FC<HeaderProps> = ({posts}) => {
    if (!posts || !posts.length) {
        return <h1 className="title">Create your first post</h1>;
    } else {
        const { author } = posts[0];
        console.log(author)
        console.log(author.name)
        const authorName = posts[0].author_name;
        const authorEmail = posts[0].author_email;

        const truncatedName = authorName.length > 20 ? `${authorName.slice(0, 20)}...` : authorName;
        const truncatedEmail = authorEmail.length > 20 ? `${authorEmail.slice(0, 20)}...` : authorEmail;

        return (
            <div>
                <h1 className="title">To Do List for {truncatedName} with email {truncatedEmail}</h1>
            </div>
        );
    }
};

export default Header;
