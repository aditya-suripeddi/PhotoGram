import Sidebar  from '@/components/sidebar';
import * as React from 'react';

interface ILayoutProps {
    children: React.ReactNode;
}

const Layout: React.FunctionComponent<ILayoutProps> = ({children}) => {

    // positioning and offsets: https://tailwindcss.com/docs/position (static, fixed, relative, absolute, sticky)
    // display:  https://tailwindcss.com/docs/display

  return (
    <div className='flex bg-white'>

        {/* sidebar on left for navigation */} 
        <aside className="flex gap-x-4 bg-gray-800 fixed top-0 left-0 z-40 lg:w-60 h-screen">
            <Sidebar />
        </aside>

        {/* main content for user feed */}
        <div className="lg:ml-60 lg:mr-60 p-8 flex-1 ml-36">
           {children}
        </div>

        {/* column on right side for friends suggestion */}

       <aside className='hidden lg:block bg-gray-800 fixed top-0 right-0 z-40 lg:w-60 h-screen'></aside>
    </div>
  );
};

export default Layout;
