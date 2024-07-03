import * as React from 'react'
import Sidebar from '@/components/sidebar'
import UserList from '@/components/userList'


interface ILayoutProps {
    children: React.ReactNode
}

const Layout: React.FunctionComponent<ILayoutProps> = ({children}) => {
  return (
    <div className="flex bg-white">
        {/* side bar on left for navigation */}
        <aside className="bg-gray-800 fixed top-0 left-0 z-40 lg:w-60 h-screen">
            <Sidebar />
        </aside>

        {/* content with posts feed */} 
        <div className="lg:ml-60 lg:mr-60 p-8 flex-1 ml-36">
            {children}
        </div>

        {/* sidebar on right with list of users following or recommendations of users to follow*/}
        <aside className="hidden lg:block bg-gray-800 fixed top-0 right-0 z-40 lg:w-60 h-screen">            
            <UserList />
        </aside>
    </div>
  );
};

export default Layout;