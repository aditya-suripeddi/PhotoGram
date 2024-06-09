import { createContext, useContext, useEffect, useState } from "react";

import {
    User, GoogleAuthProvider, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged
} from "firebase/auth";

import { auth } from "../firebaseConfig"

interface IUserAuthProviderProps {
    children: React.ReactNode
}

type AuthContextData = {
    user: User | null;
    logIn: typeof logIn;
    signUp: typeof signUp;
    logOut: typeof logOut;
    googleSignIn: typeof googleSignIn;
}

const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

const logOut = () => {
    signOut(auth);
};

const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
};

export const userAuthContext = createContext<AuthContextData>({
    user: null,
    logIn,
    signUp,
    logOut,
    googleSignIn,
});


// used in App.tsx:
//                         <UserAuthProvider>
//                                 <RouterProvider router={router} />
//                         </UserAuthProvider>
//
export const UserAuthProvider: React.FunctionComponent<IUserAuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);

    // effect runs onAuthStateChanged and captures user data
    useEffect(() => {

        const unsubscribe =

            onAuthStateChanged(auth,
                (user) => {
                    if (user) {
                        setUser(user);
                    }

                    return () => {
                        unsubscribe();
                    };
                });

    });

    // create AuthContextData with user data
    const value: AuthContextData = {
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn
    };

    // supply AuthContextData (value) as prop to userAuthContext built by createContext<AuthContextData>() above
    return (
        <userAuthContext.Provider value={value}>
            {children}
        </userAuthContext.Provider>
    );
}

export const useUserAuth = () => {
    return useContext(userAuthContext);
}