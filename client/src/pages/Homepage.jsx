import axios from "axios"
import { NavBar } from "../components/NavBar"
import { UserContext } from '../UserContext'
import { useContext, useEffect, useState } from 'react'
import ListingDisplayBox from "../components/ListingDisplayBox"

function Homepage() {
  //using context to check for logged in user
  const { userInfo } = useContext(UserContext)
  console.log(userInfo)

  //state variable to store all available listings
  const [listings, setListings] = useState([])

  //using useEffect to make an API call to retrieve all available listings and display it on homepage
  useEffect(() => {
    const getListings = async() =>{
      axios.get("http://localhost:5000/listings/available", { withCredentials:true })
      .then(res => setListings(res.data))
    }
    getListings()
  }, [])

  //once listings have been fetched, they will be put into an array to be rendered on the homepage.
  const listingsElements = []
  if(listings.length > 0){
    /* listingsElements = listings.map((listing,index) => {
      return <ListingDisplayBox key={index} listing={listing}/>
    }
    ) */
  }

  return (
    <>
      <NavBar/>
      {listingsElements}
    </>
  )
}

export default Homepage