import {createBrowserRouter, RouteObject} from 'react-router-dom';
import About from "../pages/About";
import UserToDoList from "../pages/UserToDoList";
import UserPost from "../pages/UserPost";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import CreatePost from "../pages/CreatePost";
import App from "../App";

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
    },
    {
        path: "/userpost/:id",
        element: <UserPost/>,
    },
    {
        path: "/createpost",
        element: <CreatePost />,
    },
];

export const router = createBrowserRouter(routes);
