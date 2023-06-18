import './App.css'
import { Login } from './components/Login'
import { Register } from './components/Register'
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

function App(){
  //using context to check for logged in user
  //depending on whether a user is logged in, we will direct them away from certain pages. 
  //For example, no user logged in and they click the User icon, we direct them to login first before /account.
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
          </Route>
          <Route
            path='listing-page'
          >
            <Route 
                path=':listingId'
                element={<ListingPage />}    
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App