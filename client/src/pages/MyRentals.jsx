import { Link } from 'react-router-dom'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext'
import axios from 'axios'

function MyRentals() {
    //fetching userInfo from context
    const { userInfo } = useContext(UserContext)

    //function to store retrieved user created listings from our backend
    const [ userListings, setUserListings ] = useState([])
  
    //function to fetch listings created by the user
    useEffect(() => {
        const getUserListings = async() => {
            axios.get(`http://localhost:5000/listings/userlistings/${userInfo._id}`)
            .then(res => setUserListings([ ...res.data ]))
            console.log(userListings)
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
                    <FontAwesomeIcon icon={faPlus} /> Add new rental
                </Link>
            </div>
            <div
                className='mt-3'
            >
                <h1
                    className='font-robotoMono text-2xl text-center'
                >
                    My Listings
                </h1>
                <div>
                    {userListings.length > 0 && userListings.map(listing => 
                        <div key={listing._id}>
                            {listing.title}
                        </div>    
                    )}
                </div>
            </div>
        </div>
    )
}

export { MyRentals }