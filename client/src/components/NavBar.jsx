/* this is the navbar seen at the homepage. This one has additional search bars in the middle that the SmallNavBar does not */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAirbnb } from "@fortawesome/free-brands-svg-icons" 
import { faMagnifyingGlass, faBars, faCircleUser, faGlobe } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import { useState, useContext } from "react"
import FlyoutMenu from "./FlyoutMenu"
import { UserContext } from '../UserContext'

function NavBar(){
    //using context to check for logged in user
    const { userInfo } = useContext(UserContext)

    //state variables that control drop down menu when user clicks on the user icon in the navbar
    const [ showMenu, setShowMenu ] = useState(false)

    return(
        <header
            className="border-b-2 border-gray-100 flex items-center justify-center"
        >
            <div
                className="flex items-center justify-between p-1 w-full xl:w-[90%]"
            >
                {/* logo, always redirects to home */}
                <Link 
                    to={'/'}
                    className="flex items-center p-5"
                >
                    <FontAwesomeIcon 
                        icon={faAirbnb} 
                        style={{color: "#ff385c", height:'40px'}} 
                        className="ml-3"
                    />
                    <span className="text-red ml-2 text-xl font-bold">gasbnb</span>
                </Link>

                {/* search bar */}
                <div 
                    className="flex items-center border-2 p-2 rounded-full shadow-md shadow-gray-300"
                >
                    <span className="border-r-2 py-1 px-4">Anywhere</span>
                    <span className="border-r-2 py-1 px-4">Any week</span>
                    <span className="py-1 px-4">Add guests</span>

                    <button 
                        className="bg-red h-10 w-10 rounded-full flex items-center justify-center ml-3 py-1 px-4"
                    >
                        <FontAwesomeIcon 
                            icon={faMagnifyingGlass} 
                            style={{color: "#fffafa",}} 
                        />
                    </button>
                </div>

                {/* menu and account section */}
                <div className="flex items-center p-5">
                    <div 
                        className="flex items-center border-2 p-2 rounded-full relative cursor-pointer"
                        onClick={() => setShowMenu(!showMenu)}    
                    >
                        <FontAwesomeIcon 
                            icon={faBars} 
                            style={{color: "#7e8186", height:'20px', marginLeft:'8px'}} 
                        />
                        
                        {/* show userInfo.avatar if a user is logged in or if user doesn't have a logo/not logged in, display a default user icon */}
                        { userInfo.avatar || 
                        <FontAwesomeIcon 
                            icon={faCircleUser} 
                            style={{color: "#9e9e9e", height:'30px', marginLeft:'20px'}} 
                        />}

                        {/* flyout menu displayed when user clicks on the div above */}
                        {showMenu ? <FlyoutMenu userInfo={userInfo} /> : ''}
                    </div>
                </div>
            </div>
        </header>
    )
}

export { NavBar }