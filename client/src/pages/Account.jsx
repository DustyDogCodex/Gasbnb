import { Link, Outlet, useLocation } from "react-router-dom"

function Account() {

    //using nested routes to render 3 subpages: Profile (index), Trips and Rentals

    //using useLocation to check with router user is on
    //subpage is then set to whichever nested route the user has selected
    //the tab for this route will then be highlighted with red background
    const location = useLocation()
    const subpage = location.pathname.split('/')[2]
    console.log(location.pathname.split('/')[2])

    return (
        <div
            className="flex flex-col items-center justify-center p-10"
        >
            <nav
                className="w-full flex justify-center mt-5 text-2xl"
            >
                <Link 
                    to={'/account'}
                    className= {`py-2 px-6 ${subpage == undefined ? 'bg-red text-white rounded-full' : ''}`}
                >
                    My Profile
                </Link>
                <Link 
                    to={'/account/trips'}
                    className={`py-2 px-6 ${subpage == 'trips' ? 'bg-red text-white rounded-full' : ''}`}
                >
                    My Trips
                </Link>
                <Link 
                    to={'/account/rentals'}
                    className={`py-2 px-6 ${subpage == 'rentals' ? 'bg-red text-white rounded-full' : ''}`}
                >
                    My Rentals
                </Link>
            </nav>
            <Outlet/>
        </div>
    )
}

export { Account }