import {createBrowserRouter, redirect, RouteObject} from 'react-router-dom';
import About from "../pages/About";
import UserToDoList from "../pages/UserToDoList";
import UserPost from "../pages/UserPost";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import CreatePost from "../pages/CreatePost";
import App from "../App";


const rootLoader = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
        return redirect("/login");
    }
    return null;
};

const routes: RouteObject[] = [
    {
        path: "/about",
        element: <App/>,
    },
    // {
    //     path: "/about",
    //     element: <About/>,
    // },
    {
        path: "/login",
        element: <LogIn/>,
    },
    {
        path: "/signup",
        element: <SignUp/>,
    },

    {
        path: "/usertodolist",
        element: <UserToDoList/>,
        loader: rootLoader,
    },
    {
        path: "/userpost/:id",
        element: <UserPost/>,
        loader: rootLoader,
    },
    {
        path: "/createpost",
        element: <CreatePost/>,
        loader: rootLoader,
    },
];

export const router = createBrowserRouter(routes);
