
import { createContext, useEffect, useState, useContext } from 'react'
import {auth} from '@/firebaseConfig'
import {User, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup, onAuthStateChanged, GoogleAuthProvider, updateProfile } from 'firebase/auth'
import { ProfileInfo } from '@/types';

type AuthContextData = {
    user: User | null,
    logIn: typeof logIn,
    signUp: typeof signUp,
    logOut: typeof logOut,
    googleSignIn: typeof googleSignIn,
    updateProfileInfo: typeof updateProfileInfo;

}

const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

const logOut = () => signOut(auth) 

const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
}

const updateProfileInfo = (profileInfo: ProfileInfo) => {
    console.log("The user profileInfo is : ", profileInfo);
    return updateProfile(profileInfo.user!, {
      displayName: profileInfo.displayName,
      photoURL: profileInfo.photoURL,
    });
};
  
export const userAuthContext = createContext<AuthContextData>(
    {user: null, logIn, signUp, logOut, googleSignIn, updateProfileInfo}
)

interface IUserAuthProviderProps { children: React.ReactNode }

const UserAuthProvider: React.FunctionComponent<IUserAuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    // runs every time component is re-rendered
    useEffect( () => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if( user ) {
                setUser(user)
            }
        });

        
        // why unsubscribe ? https://blog.stackademic.com/concept-clear-of-onauthstatechanged-e8dddd4ff5c8 
        // effect clean-up:  https://www.w3schools.com/react/react_useeffect.asp

        // Usage (when setup and cleanup code is called by React) https://react.dev/reference/react/useEffect#connecting-to-an-external-system
        return () => unsubscribe();
    })

    const authContextData: AuthContextData = {user, logIn, signUp, logOut, googleSignIn, updateProfileInfo}

    return (

        /*
            wrap the children in context provider block to make 
            context available for access from any component 
            within this component tree
        */
        <userAuthContext.Provider value={authContextData}>
            {children}
        </userAuthContext.Provider>
    );
};

export default UserAuthProvider;


export const useUserAuth = () => { return  useContext(userAuthContext); }