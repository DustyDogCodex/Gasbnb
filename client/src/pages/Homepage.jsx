import axios from "axios"
import { NavBar } from "../components/NavBar"
import { UserContext } from '../UserContext'
import { useContext, useEffect, useState } from 'react'
import ListingDisplayBox from "../components/ListingDisplayBox"

function Homepage() {
  //using context to check for logged in user
  const { userInfo } = useContext(UserContext)

  //state variable to store all available listings
  const [listings, setListings] = useState([])

  //using useEffect to make an API call to retrieve all available listings and display it on homepage
  useEffect(() => {
    const getListings = async() =>{
      axios.get("http://localhost:5000/listings/available")
      .then(res => setListings(res.data))
    }
    getListings()
  }, [])

  return (
    <>
        <NavBar/>
        <div
            className="flex flex-wrap"
        >
            {listings.length > 0 && listings.map((listing,index) => 
                <ListingDisplayBox key={index} listing={listing}/> 
            )}
        </div>
    </>
  )
}

export default Homepage