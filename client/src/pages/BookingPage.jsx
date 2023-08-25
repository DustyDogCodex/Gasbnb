import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import pikachu from '../assets/pikachu.gif'
import { NavBar } from '../components/NavBar'

function BookingPage() {
    //grabbing booking id from params
    const { bookingId } = useParams()
    
    //state variable for storing booking info + loading animation
    const [ booking, setBooking ] = useState({})
    const [ loading, setLoading ] = useState(true)

    //fetching booking info from backend
    useEffect(() => {
        const getBookingInfo = async() => {
            axios.get(`https://gasbnb-production.up.railway.app/bookings/${bookingId}`)
            .then(res => {
                setBooking(res.data)
                //once data is loaded, remove loading animation
                setLoading(false)    
            })
            .catch(err => console.log(err))
        }
        getBookingInfo()
    }, [])

    //function to cancel reservation
    async function deleteReservation(e){
        e.preventDefault()
        axios.delete(`https://gasbnb-production.up.railway.app/bookings/${bookingId}`)
        .then(res => {
            if(res.data = 'booking deleted'){
                window.location.assign('/account/trips')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <>
        <NavBar />
        <div
            className="h-screen flex flex-col items-center justify-center bg-stone-200 pb-36 sm:pb-5"
        >
            {loading 
                ?   
                /* loading screen with a running pikachu animation :) */
                (
                    <div 
                        className="w-full h-screen flex justify-center items-center bg-black/80 z-10"
                    >
                        <img 
                            src={pikachu}
                            alt="pikachu running loading animation" 
                            className="w-60 h-60"
                        />
                    </div>
                )
                :    
                /* reservation info which is displayed once booking info is fetched from server */                
                <div
                    className="flex flex-col items-center justify-center bg-white rounded-lg p-5"
                >
                    <h1
                        className="text-3xl my-5"
                    >
                        Your Scheduled Trip
                    </h1>

                    <div>
                        {/* link to listing page for selected booking */}
                        <Link
                            to={`/listing-page/${booking?.listingId?._id}`}
                            className="flex items-center m-3 bg-slate-200 rounded-lg"
                        >
                        
                            <img 
                                src={`https://gasbnb-production.up.railway.app/uploads/${booking?.listingId?.photos?.[0]}`}
                                alt={`${booking?.listingId?.title} cover image`} 
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
                                    {booking?.listingId?.location}
                                </p>
                            </div>
                        </Link>

                        {/* Itinerary including dates for this booking */}
                        <div
                            className="p-3 border-2 border-sky-200 rounded-lg"
                        >
                            <h1
                                className="text-2xl text-center"
                            >
                                Itinerary
                            </h1>

                            <div
                                className="mt-3"
                            >
                                <p
                                    className="text-lg"
                                >
                                    <span className="font-bold">Check In:</span> {new Date(booking.checkInDate).toLocaleDateString()}
                                </p>

                                <p
                                    className="text-lg"
                                >
                                    <span className="font-bold">Check Out:</span> {new Date(booking.checkOutDate).toLocaleDateString()}
                                </p>
                                    
                                <p
                                    className="text-lg"
                                >
                                    <span className="font-bold">Total Cost:</span> ${booking.totalCost}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* button to cancel reservation and delete listing */}
                    <button
                        className="bg-red my-8 text-xl text-white py-3 px-8 rounded-full"
                        onClick={(e) => deleteReservation(e)}
                    >
                        Cancel Reservation
                    </button>
                </div>
            }
        </div>
        </>
    )
}

export default BookingPage