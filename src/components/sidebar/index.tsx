import { Link, useLocation } from 'react-router-dom'
import homeIcon from '@/assets/icons/home.svg'
import addIcon from '@/assets/icons/add.svg'
import directIcon from '@/assets/icons/direct.svg'
import notificationIcon from '@/assets/icons/notification.svg'
import myphotoIcon from '@/assets/icons/myphotos.svg'
import settingsIcon from '@/assets/icons/settings.svg'
import profileIcon from '@/assets/icons/profile.svg'
import logOutIcon from '@/assets/icons/logout.svg'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useUserAuth } from '@/context/userAuthContext'


interface ISidebarProps { }

const navItems = [
    { name: "Home", link: "/", icon: homeIcon },
    { name: "Add Photos", link: "/post", icon: addIcon },
    { name: "My Photos", link: "/myphotos", icon: myphotoIcon },
    { name: "Profile", link: "/profile", icon: profileIcon },
    { name: "Notifications", link: "#", icon: notificationIcon },
    { name: "Direct", link: "#", icon: directIcon },
    { name: "Settings", link: "#", icon: settingsIcon }
]

/*
<div className={cn(buttonVariants({variant : "default"})),
                item.link == pathname ? "" }>

</div>
*/

// left sidebar (navigation menu)
const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {

    const { pathname } = useLocation()
    const { logOut } = useUserAuth()

    return (
        <nav className="flex flex-col relative h-screen max-w-sm w-full">
            <div className="flex justify-center m-5">
                <div className="text-white text-lg">PhotoGram</div>
            </div>
            {

                navItems.map((item) => (
                    // style conditionally, is the nav item same as link of current page 
                    <div
                        className={
                            cn(
                                buttonVariants({ variant: "default" }),
                                item.link === pathname ?
                                    "bg-white text-gray-800 hover:bg-white" :
                                    "hover:bg-slate-950 bg-gray-800",
                                "justify-start rounded-none"
                            )
                        }

                        key={item.name}>

                        <Link to={item.link} className="flex">
                            <span>
                                <img src={item.icon}
                                     className="w-5 h-5 mr-2"
                                     alt={item.name}
                                     style={{ filter : `${pathname === item.link ? "invert(0)" : "invert(1)"}` }}
                                />
                            </span>
                            <span>{item.name}</span>
                        </Link>

                    </div>
                ))

            }
            
            <div
                className={
                    cn(
                        buttonVariants({ variant: "default" }),
                        "/login" === pathname ?
                            "bg-white text-white-10 hover:bg-white" :
                            "hover:bg-slate-950 hover:text-white bg-transparent",
                        "justify-start rounded-none"
                    )
                }>
                    
                <Link to="/login" className="flex" onClick={logOut}>
                    <span>
                        <img src={logOutIcon}
                                className="w-5 h-5 mr-2"
                                alt="LogOut"
                                style={{ 
                                    filter : `${pathname === '/login' ? "invert(0)" : "invert(1)"}`
                                 }}
                        />
                    </span>
                    <span>LogOut</span>
                </Link>
                
            </div>
        </nav>
    );
};

export default Sidebar;
