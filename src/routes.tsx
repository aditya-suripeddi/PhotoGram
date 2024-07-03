import { createBrowserRouter } from "react-router-dom";
import Home            from    "./pages/home";
import CreatePost      from    "./pages/post";
import Login           from    "./pages/login";
import SignUp          from    "./pages/signup";
import Error           from    "./pages/error";
import MyPhotos        from    "./pages/myphotos";
import Profile         from    "./pages/profile";
import EditProfile     from    "./pages/profile/editProfile";
import ProtectedRoutes from    "./components/protectedRoutes"

//  element, children, path, errorElement
export const router = createBrowserRouter([
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: "/",
                element: <Home />,  // home page is a protected route, user details are needed without which 
                                    //  protected router takes you back to Login page 
                errorElement: <Error /> 
            },
            {
                path: "/post",
                element: <CreatePost />,
                errorElement: <Error />,
            },
            {
                path: "/profile",
                element: <Profile />,
                errorElement: <Error />,
              },
              {
                path: "/edit-profile",
                element: <EditProfile />,
                errorElement: <Error />,
              },
            {
                path: "/myphotos",
                element: <MyPhotos />,
                errorElement: <Error />,
            }
        ]
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <Error />,
    },
    {
        path: "/signup",
        element: <SignUp />,
        errorElement: <Error />,
    }
]);

export default router;