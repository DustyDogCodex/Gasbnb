import { useContext, useEffect, useState } from "react"
import { UserContext } from "../UserContext"
import axios from 'axios'
import UserBookings from "../components/UserBookings"
import pikachu from '../assets/pikachu.gif'

function MyTrips() {
    //userContext for grabbing userId
    const { userInfo } = useContext(UserContext)

    //state variable for storing users bookings
    const [ userTrips, setUserTrips ] = useState([])

    //toggle for loading animation while data is fetched from server
    const [ loading, setLoading ] = useState(true)

    //get all bookings belonging to this user
    useEffect(() => {
        async function userBookings(){
            axios.get(`https://gasbnb-production.up.railway.app/bookings/booking-info/${userInfo._id}`)
            .then(res => { 
                setUserTrips(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
        }
        userBookings()
    }, [])

    return (
        <div
            className="flex flex-col items-center justify-center"
        >
            {/* heading */}
            <h1
                className="text-2xl font-mont"
            >
                My Trips
            </h1>

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
                /* display for reservations made by the user */
                (
                    <div
                        className="mt-8"
                    >
                        {userTrips.length 
                            ?  userTrips.map((booking, index) => <UserBookings key={index} booking={booking}/>)
                            : 'No trips scheduled.'    
                        }   
                    </div>
                )
            }
        </div>
    )
}

export default MyTrips