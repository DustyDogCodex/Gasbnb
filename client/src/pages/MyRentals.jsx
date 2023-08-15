import { Link } from 'react-router-dom'
import { faL, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext'
import axios from 'axios'
import UserListingDisplayBox from '../components/UserListingDisplayBox'
import pikachu from '../assets/pikachu.gif'

function MyRentals() {
    //fetching userInfo from context
    const { userInfo } = useContext(UserContext)

    //function to store retrieved user created listings from our backend
    const [ userListings, setUserListings ] = useState([])

    //toggle for loading animation while data is fetched from server
    const [ loading, setLoading ] = useState(true)
  
    //function to fetch listings created by the user
    //sending user id as params to locate listings created by user
    useEffect(() => {
        const getUserListings = async() => {
            axios.get(`http://localhost:5000/listings/userlistings/${userInfo._id}`)
            .then(res => { 
                setUserListings([ ...res.data ])
                setLoading(false)
            })
            .catch(err => console.log(err))
        }
        getUserListings()
    }, [])

    return (
        <div>
            {/* create a new listing */}
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

            {/* display any currently created listings */}
            <div
                className='mt-3'
            >
                <h1
                    className='font-robotoMono text-2xl text-center my-3'
                >
                    My Listings
                </h1>

                {loading
                    ?
                    /* loading animation */
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
                    (
                        /* display userlistings. If no userlistings, display "no listings created" instead */
                        <div>
                            {userListings.length > 0 
                                ? 
                                userListings.map(listing => 
                                    <UserListingDisplayBox 
                                        key={listing._id} 
                                        userListing={listing}
                                    />    
                                ) 
                                :
                                <p className='text-center'>No listings created</p> 
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export { MyRentals }