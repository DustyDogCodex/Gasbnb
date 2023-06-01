import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAirbnb } from "@fortawesome/free-brands-svg-icons" 
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

function Header(){
    return(
        <header className="flex items-center">
            <div className="flex items-center p-5">
                <FontAwesomeIcon 
                    icon={faAirbnb} 
                    style={{color: "#e53c61", height:'40px'}} 
                    className="ml-3"
                />
                <span className="text-red-600/80 ml-2 text-xl font-bold">gasbnb</span>
            </div>
            <div className="flex items-center border-2 p-2 rounded-full shadow-md shadow-gray-300">
                <span className="border-r-2 py-1 px-4">Anywhere</span>
                <span className="border-r-2 py-1 px-4">Any week</span>
                <span className="py-1 px-4">Add guests</span>
                <button className="bg-red-600/80 h-10 w-10 rounded-full flex items-center justify-center ml-3 py-1 px-4">
                    <FontAwesomeIcon 
                        icon={faMagnifyingGlass} 
                        style={{color: "#fffafa",}} />
                </button>
            </div>
        </header>
    )
}

export { Header }