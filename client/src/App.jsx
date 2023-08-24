import './App.css'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { UserContext } from './UserContext'
import { useContext } from 'react'
import Homepage from './pages/Homepage'
import { Account } from './pages/Account'
import { MyRentals } from './pages/MyRentals'
import { Profile } from './pages/Profile'
import MyTrips from './pages/MyTrips'
import CreateNewRental from './pages/CreateNewRental'
import { ListingPage } from './pages/ListingPage'
import EditListing from './pages/EditListing'
import ConfirmReservation from './pages/ConfirmReservation'
import BookingPage from './pages/BookingPage'
import useMediaQuery from "./hooks/useMediaQuery"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAirbnb } from '@fortawesome/free-brands-svg-icons'
import { faPlaneDeparture, faUser } from '@fortawesome/free-solid-svg-icons'
import Footer from './components/Footer'

function App(){
    //using context to check for logged in user
    //depending on whether a user is logged in, they will be directed away from certain pages. 
    //For example, if the user is not logged in and they click the User icon, they will be directed to login first before /account.
    const { userInfo } = useContext(UserContext)

    //variable to determine if screen size is above xs/mobile screens
    const aboveSmallScreens = useMediaQuery('(min-width: 780px)')

    return (
    <>
        <BrowserRouter>
        <Routes>
            <Route
                path='/'
                element={<Homepage/>}
            />

            <Route
                path='register'
                element={<Register/>}
            />

            <Route
                path='login'
                element={<Login/>}
            />

            {/* Account and associated subpages */}
            <Route
                path='account'
                element={ userInfo ? <Account /> : <Login />}
            >
                <Route index element={<Profile />} />
                <Route path='trips' element={<MyTrips />} />
                <Route path='rentals' element={<MyRentals />} />
                <Route path='rentals/new' element={<CreateNewRental />} />
                <Route path='rentals/edit/:listingId' element={<EditListing />} />
            </Route>

            {/* Page for displaying complete information about a selected listing */}
            <Route
                path='listing-page/:listingId'
                element={<ListingPage />}
            />

            {/* Page for confirming listing after clicking on the reserve link in reservation widget */}
            <Route
                path='confirm-payment/:listingId/:checkInDate/:checkOutDate/:numGuests'
                element={userInfo ? <ConfirmReservation /> : <Login/>}
            />

            {/* page for info about a booked reservation */}
            <Route
                path='booking-page/:bookingId'
                element={<BookingPage />}
            />
        </Routes>

        {/* nav bar on bottom of screen for mobile/xs screens */}
        {!aboveSmallScreens &&
            (
            <div
                className="sticky bottom-0 left-0 mt-3 border-t w-full bg-white py-3 flex items-center justify-evenly"
            >   
                <Link
                    to={'/account/trips'}
                    className='flex flex-col items-center justify-center'
                >
                    <FontAwesomeIcon 
                        icon={faPlaneDeparture} 
                        style={{ color:'skyblue', height:'25px', width:'25px' }}
                    />
                    <span className='text-xs'>Trips</span>
                </Link>

                <Link
                    to={'/'}
                    className='flex flex-col items-center justify-center'
                >
                    <FontAwesomeIcon 
                        icon={faAirbnb} 
                        style={{ color:'skyblue', height:'25px', width:'25px' }}
                    />
                    <span className='text-xs'>Home</span>
                </Link>

                <Link
                    to={'/account'}
                    className='flex flex-col items-center justify-center'
                >
                    <FontAwesomeIcon 
                        icon={faUser} 
                        style={{ color:'skyblue', height:'25px', width:'25px' }}
                    />
                    <span className='text-xs'>Profile</span>
                </Link>
            </div>
        )}
        </BrowserRouter>

        {/* footer will be displayed when above xs/mobile screens in place of bottom nav bar */}
        {aboveSmallScreens && (<Footer />)}
    </>
  )
}

export default App