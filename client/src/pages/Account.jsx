import { Link, Outlet, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faList, faPeopleRoof } from "@fortawesome/free-solid-svg-icons"
import { NavBar } from "../components/NavBar"

function Account() {

    //using nested routes to render 3 subpages: Profile (index), Trips and Rentals

    //using useLocation to check with router user is on
    //subpage is then set to whichever nested route the user has selected
    //the tab for this route will then be highlighted with red background
    const location = useLocation()
    const subpage = location.pathname.split('/')[2]

    return (
        <>
            <NavBar />
            <div
                className="flex flex-col p-10 items-center justify-center"
            >
                <nav
                    className="w-full flex justify-center my-5 text-2xl gap-2"
                >
                    <Link 
                        to={'/account'}
                        className= {`py-2 px-6 ${subpage == undefined ? 'bg-red text-white rounded-full' : ''}`}
                    >
                        <FontAwesomeIcon icon={faUser} /> My Profile
                    </Link>

                    <Link 
                        to={'/account/trips'}
                        className={`py-2 px-6 ${subpage == 'trips' ? 'bg-red text-white rounded-full' : ''}`}
                    >
                        <FontAwesomeIcon icon={faList} /> My Trips
                    </Link>
                
                    <Link 
                        to={'/account/rentals'}
                        className={`py-2 px-6 ${subpage == 'rentals' ? 'bg-red text-white rounded-full' : ''}`}
                    >
                        <FontAwesomeIcon icon={faPeopleRoof} /> My Rentals
                    </Link>
                </nav>

                {/* outlet for displaying sub pages */}
                <Outlet/>
            </div>
        </> 
    )
}

export { Account }