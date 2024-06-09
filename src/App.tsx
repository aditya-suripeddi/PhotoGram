 import * as React from 'react';
import {RouterProvider} from 'react-router-dom'; // react component for routing
import router from './routes';       // routes.tsx: custom browser router with protected routes / children
import { UserAuthProvider } from './context/userAuthContext';

interface IAppProps {}

// https://reactrouter.com/en/main/routers/router-provider
const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <UserAuthProvider> {/* UserAuthProvider:  onAuthStateChange propogate UserAuthContext
                                              (wrapped in context api) to protected routes */} 
      <RouterProvider router={router} />
    </UserAuthProvider>
  )
};

export default App;