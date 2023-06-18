import { Link } from 'react-router-dom'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext'
import axios from 'axios'
import UserListingDisplayBox from '../components/UserListingDisplayBox'

function MyRentals() {
    //fetching userInfo from context
    const { userInfo } = useContext(UserContext)

    //function to store retrieved user created listings from our backend
    const [ userListings, setUserListings ] = useState([])
  
    //function to fetch listings created by the user
    //sending user id as params to locate listings created by user
    useEffect(() => {
        const getUserListings = async() => {
            axios.get(`http://localhost:5000/listings/userlistings/${userInfo._id}`)
            .then(res => setUserListings([ ...res.data ]))
        }
        getUserListings()
    }, [])

    return (
        <div>
            <div
                className='flex items-center justify-center my-3'
            >
                <Link 
                    to={'/account/rentals/new'}
                    className='bg-red text-white px-4 py-2 rounded-full text-xl'
                >
                    <FontAwesomeIcon icon={faPlus} /> Add new listing
                </Link>
            </div>
            <div
                className='mt-3'
            >
                <h1
                    className='font-robotoMono text-2xl text-center my-3'
                >
                    My Listings
                </h1>
                <div>
                    {/* display userlistings. If no userlistings, display "no listings created" instead */}
                    {userListings.length > 0 ? userListings.map(listing => 
                        <UserListingDisplayBox key={listing._id} userListing={listing}/>    
                    ) : "No listings created"}
                </div>
            </div>
        </div>
    )
}

export { MyRentals }