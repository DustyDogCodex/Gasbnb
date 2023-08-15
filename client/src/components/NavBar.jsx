/* this is the navbar seen at the homepage. This one has additional search bars in the middle that the SmallNavBar does not */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAirbnb } from "@fortawesome/free-brands-svg-icons" 
import { faMagnifyingGlass, faBars, faCircleUser } from "@fortawesome/free-solid-svg-icons"
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
            className="sticky top-0 border-b-2 border-gray-100 flex items-center justify-center bg-white z-10 py-2"
        >
            <div
                className="flex items-center justify-between p-1 w-full xl:w-[90%]"
            >
                {/* logo, always redirects to home */}
                <Link 
                    to={'/'}
                    className="hidden sm:flex items-center px-5"
                >
                    <FontAwesomeIcon 
                        icon={faAirbnb} 
                        style={{color: "#ff385c", height:'40px'}} 
                        className="ml-3"
                    />
                    <span className="text-red ml-2 text-xl font-bold">gasbnb</span>
                </Link>

                {/* section in center that includes the search bar + anywhere/any week/ add guests */}
                <div 
                    className="flex items-center justify-between border-2 p-2 rounded-full text-sm font-semibold shadow-md shadow-gray-300 w-full sm:w-fit"
                >
                    <span className="hidden sm:block border-r-2 py-1 px-4 cursor-pointer">Anywhere</span>
                    <span className="hidden sm:block border-r-2 py-1 px-4 cursor-pointer">Any week</span>
                    <span className="py-1 px-4 cursor-pointer">Add guests</span>

                    <button 
                        className="bg-red h-10 w-10 rounded-full flex items-center justify-center ml-3 py-1 px-4"
                    >
                        <FontAwesomeIcon 
                            icon={faMagnifyingGlass} 
                            style={{color: "#fffafa"}} 
                        />
                    </button>
                </div>

                {/* menu and account section */}
                <div className="hidden sm:flex items-center px-5">
                    <div 
                        className="flex items-center border-2 p-2 rounded-full relative cursor-pointer"
                        onClick={() => setShowMenu(!showMenu)}    
                    >
                        <FontAwesomeIcon 
                            icon={faBars} 
                            style={{color: "#7e8186", height:'20px', marginLeft:'8px'}} 
                        />
                        
                        {/* show user avatar if a user is logged in or if user doesn't have a profile pic/not logged in, display a default user icon */}
                        {userInfo.avatar 
                            ?
                                <img 
                                    src={`http://localhost:5000/uploads/${userInfo.avatar}`} 
                                    alt="user profile pic"
                                    className="w-10 h-10 rounded-full ml-3" 
                                />
                            :
                            <FontAwesomeIcon 
                                icon={faCircleUser} 
                                style={{color: "#9e9e9e", height:'30px', marginLeft:'20px'}} 
                            />
                        }

                        {/* flyout menu displayed when user clicks on the div above */}
                        {showMenu ? <FlyoutMenu userInfo={userInfo} /> : ''}
                    </div>
                </div>
            </div>
        </header>
    )
}

export { NavBar }