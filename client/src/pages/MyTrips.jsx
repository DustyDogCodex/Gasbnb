import { useContext, useEffect, useState } from "react"
import { UserContext } from "../UserContext"
import axios from 'axios'

function MyTrips() {
    //userContext for grabbing userId
    const { userInfo } = useContext(UserContext)

    //state variable for storing users bookings
    const [ userTrips, setUserTrips ] = useState([])

    //get all bookings belonging to this user
    useEffect(() => {
        async function userBookings(){
            axios.get(`http://localhost:5000/bookings/booking-info/${userInfo._id}`)
            .then(res => console.log(res.data))
        }
        userBookings()
    }, [])

    return (
        <div
            className="flex items-center justify-center"
        >
            <h1
                className="text-2xl"
            >
                My Trips
            </h1>
            <div>
                
            </div>
        </div>
    )
}

export default MyTrips