import './App.css'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom"
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

function App(){
  //using context to check for logged in user
  //depending on whether a user is logged in, they will be directed away from certain pages. 
  //For example, if the user is not logged in and they click the User icon, they will be directed to login first before /account.
  const { userInfo } = useContext(UserContext)

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
          <Route
            path='booking-page/:bookingId'
            element={<BookingPage />}
          />
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App