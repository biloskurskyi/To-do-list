import {createBrowserRouter, redirect, RouteObject} from 'react-router-dom';
import About from "../pages/About";
import UserToDoList from "../pages/UserToDoList";
import UserPost from "../pages/UserPost";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import CreatePost from "../pages/CreatePost";
import App from "../App";
import UpdatePost from "../pages/UpdatePost.tsx";
import ActivationStatus from "../pages/ActivationStatus.tsx";
import Layout from "../pages/common/Layout.tsx";


const rootLoader = async (): Promise<null | Response> => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
        return redirect("/login");
    }
    return null;
};

const routes: RouteObject[] = [
        {
            path: "/",
            element: <App/>,
            children: [
                {
                    path: "/about",
                    element: <About/>,
                },
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
                    path: "/createpost",
                    element: <CreatePost/>,
                    loader: rootLoader,
                },
                {
                    path: "/updatepost/:id",
                    element: <UpdatePost/>,
                    loader: rootLoader,
                },
                {
                    path: "/activate/:token",
                    element: <ActivationStatus/>
                },
            ],
        },
        {
            path: "/userpost/:id",
            element: <UserPost/>,
            loader: rootLoader,
        },


    ]
;

export const router = createBrowserRouter(routes);
