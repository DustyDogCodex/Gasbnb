import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAirbnb } from "@fortawesome/free-brands-svg-icons" 
import { faBars, faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'

function SmallNavBar() {
    return (
        <header className="flex items-center justify-between border-b-2 border-gray-100 p-1">
            <div>
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
            </div>
            <div className="flex items-center p-5">
                <div className="flex items-center border-2 p-2 rounded-full">
                    <FontAwesomeIcon 
                        icon={faBars} 
                        style={{color: "#7e8186", height:'20px', marginLeft:'8px'}} 
                    />
                    <FontAwesomeIcon 
                        icon={faCircleUser} 
                        style={{color: "#9e9e9e", height:'30px', marginLeft:'20px'}} 
                    />
                </div>
            </div>
        </header>
    )
}

export default SmallNavBar