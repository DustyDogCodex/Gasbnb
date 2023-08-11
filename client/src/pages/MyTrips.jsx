import { useContext, useEffect, useState } from "react"
import { UserContext } from "../UserContext"
import axios from 'axios'
import UserBookings from "../components/UserBookings"

function MyTrips() {
    //userContext for grabbing userId
    const { userInfo } = useContext(UserContext)

    //state variable for storing users bookings
    const [ userTrips, setUserTrips ] = useState([])

    //get all bookings belonging to this user
    useEffect(() => {
        async function userBookings(){
            axios.get(`http://localhost:5000/bookings/booking-info/${userInfo._id}`)
            .then(res => setUserTrips(res.data))
            .catch(err => console.log(err))
        }
        userBookings()
    }, [])

    console.log(userTrips)

    return (
        <div
            className="flex flex-col items-center justify-center"
        >
            {/* heading */}
            <h1
                className="text-2xl"
            >
                My Trips
            </h1>

            {/* display for reservations made by the user */}
            <div
                className="mt-8"
            >
                {userTrips && userTrips.map((booking, index) => <UserBookings key={index} booking={booking}/>)}

                {/* if user has no current reservations */}
                {!userTrips && 'No trips currently booked.'}
            </div>
        </div>
    )
}

export default MyTrips