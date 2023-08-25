import axios from "axios"
import { NavBar } from "../components/NavBar"
import { useEffect, useState } from 'react'
import ListingDisplayBox from "../components/ListingDisplayBox"
import pikachu from '../assets/pikachu.gif'
import Categories from "../components/Categories"

function Homepage() {
    //state variable to store all available listings
    const [ listings, setListings ] = useState([])

    //toggle for loading animation while data is fetched from server
    const [ loading, setLoading ] = useState(true)

    //using useEffect to make an API call to retrieve all available listings and display it on homepage
    useEffect(() => {
        const getListings = async() =>{
            axios.get("https://gasbnb-production.up.railway.app/listings/available")
            .then(res => {
                setListings([ ...res.data ])
                setLoading(false)
            })
            .catch(err => console.log(err))
        }
        getListings()
    }, [])

    return (
        <>
            <NavBar/>

            {/* categories section */}
            <Categories />

            {/* listing display */}
            <div
                className="flex items-center justify-center pb-36 sm:pb-5"
            >
                {loading 
                    ?
                    /* loading screen with a running pikachu animation :) */
                    (
                        <div 
                            className="w-full flex justify-center items-center"
                        >
                            <img 
                                src={pikachu}
                                alt="pikachu running loading animation" 
                                className="w-60 h-60"
                            />
                        </div>
                    )
                    :
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 p-8 h-screen w-screen xl:w-[90%]"
                    >
                        {listings.length > 0 && listings.map((listing,index) => 
                            <ListingDisplayBox 
                                key={index} 
                                id={listing._id}
                                image={listing?.photos[0]}
                                title={listing.title}
                                location={listing.location}
                                price={listing.price}
                            /> 
                        )}
                    </div>
                }
            </div>
        </>
    )
}

export default Homepage