import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

function BookingPage() {
    //grabbing booking id from params
    const { bookingId } = useParams()

    //state variable for storing booking info
    const [ booking, setBooking ] = useState({})

    //fetching booking info from backend
    useEffect(() => {
        const getBookingInfo = async() => {
            axios.get(`http://localhost:5000/bookings/${bookingId}`)
            .then(res => setBooking(...res.data))
        }
        getBookingInfo()
    }, [])

    //function to cancel reservation
    async function deleteReservation(e){
        e.preventDefault()
        axios.delete(`http://localhost:5000/bookings/${bookingId}`)
        .then(res => {
            if(res.data = 'booking deleted'){
                window.location.assign('/account/trips')
            }
        })
    }

    console.log(booking)

    return (
        <div
            className="flex flex-col items-center justify-center border border-emerald-600"
        >
            <h1
                className="text-3xl my-5"
            >
                Your Scheduled Trip
            </h1>
            <div>
                <Link
                    to={`/listing-page/${booking?.listingId?._id}`}
                    className="flex items-center m-3 bg-slate-200 rounded-lg"
                >
                    <img 
                        src={`http://localhost:5000/uploads/${booking?.listingId?.photos?.[0]}`}
                        alt="" 
                        className="h-48 rounded-lg"
                    />
                    <div
                        className="ml-3 p-3"
                    >
                        <h1
                            className="text-2xl"
                        >
                            {booking?.listingId?.title}
                        </h1>
                        <p>
                            {booking.listingId.location}
                        </p>
                    </div>
                </Link>
                <div
                    className="p-3"
                >
                    <h1
                        className="text-2xl"
                    >
                        Itinerary
                    </h1>
                    <div
                        className="mt-3"
                    >
                        <p
                            className="text-lg"
                        >
                            Check In: {new Date(booking.checkInDate).toLocaleDateString()}
                        </p>
                        <p
                            className="text-lg"
                        >
                            Check Out: {new Date(booking.checkOutDate).toLocaleDateString()}
                        </p>
                        <p
                            className="text-lg"
                        >
                            Total Cost: ${booking.totalCost}
                        </p>
                    </div>
                </div>
            </div>
            <button
                className="bg-red my-8 text-xl text-white py-3 px-8 rounded-full"
                onClick={(e) => deleteReservation(e)}
            >
                Cancel Reservation
            </button>
        </div>
    )
}

export default BookingPage