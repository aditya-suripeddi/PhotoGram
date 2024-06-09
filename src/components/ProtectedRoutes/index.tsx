import * as React from 'react';
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

interface IProtectedRoutesProps {}

const ProtectedRoutes: React.FunctionComponent<IProtectedRoutesProps> = (props) => {
    
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth);
    const location = useLocation(); 

    if( loading ) {
        return <div>...Loading</div>;
    }

    // fetch user from userAuthContext passed by UserAuthProvider 
    // take to login page if user details are not available (null)
    // take to respective page the browser asked for when user details are available (user is authenticated) 
    return user ? 
     ( <Outlet /> ) :
     ( <Navigate to="/login" state={{ from: location}} /> );

};

export default ProtectedRoutes;
