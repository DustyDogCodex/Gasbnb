import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAirbnb } from "@fortawesome/free-brands-svg-icons" 
import { faMagnifyingGlass, faBars, faCircleUser, faGlobe } from "@fortawesome/free-solid-svg-icons"

function Header(){
    return(
        <header className="flex items-center justify-between border-b-2 border-gray-100 p-1">
            <div className="flex items-center p-5">
                <FontAwesomeIcon 
                    icon={faAirbnb} 
                    style={{color: "#ff385c", height:'40px'}} 
                    className="ml-3"
                />
                <span className="text-red ml-2 text-xl font-bold">gasbnb</span>
            </div>
            <div className="flex items-center border-2 p-2 rounded-full shadow-md shadow-gray-300">
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
            <div className="flex items-center p-5">
                <span className="mr-6">Airbnb your home</span>
                <FontAwesomeIcon 
                    icon={faGlobe} 
                    style={{color: "#adadad", height:'20px', marginRight:'20px'}} 
                />
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

export { Header }