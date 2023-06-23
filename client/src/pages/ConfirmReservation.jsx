import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import PriceCalculator from "../components/PriceCalculator"
import { UserContext } from "../UserContext"

function ConfirmReservation() {
    //using context to grab user ID for bookig
    const { userInfo } = useContext(UserContext)

    //using useParams to identify passed parameters from listing page 
    const { listingId, checkInDate, checkOutDate, numGuests } = useParams()

    /* listing info */
    const [ listing, setListing ] = useState({})

    //calculating total price for storing in database
    let differenceInDays = (new Date(checkOutDate) - new Date(checkInDate)) / (24 * 60 * 60 * 1000) 
    let totalCost = (listing.price * differenceInDays) + 100 + Math.ceil((listing.price * differenceInDays) * 0.0420)
    
    //fetching listing info from backend
    useEffect(() => {
        const getListingInfo = async() => {
            await axios.get(`http://localhost:5000/listings/available/${listingId}`)
            .then(res => setListing(res.data))
        }
        getListingInfo()
    }, [])

    //function to confirm booking and send booking data to server
    async function confirmBooking(e){
        e.preventDefault()
        axios.post("http://localhost:5000/bookings/new-booking",
            { userId: userInfo._id, listingId, checkInDate, checkOutDate, numGuests, totalCost }
        ).then(res => {
            if(res.data == 'success'){
                window.location.replace('/account/trips')
            }
        })
    }

    return (
        <div 
            className="w-screen h-screen p-10 flex item-center justify-center"
        >
            <div
                className="flex lg:w-4/5 lg:items-center lg:justify-center border-2 border-emerald-500 rounded-lg"
            >
                <div
                    className="w-1/2 p-5 m-3"
                >   
                    <h1
                        className="text-3xl"
                    >
                        Request to book
                    </h1>
                    <div
                        className="mt-8 border-b-2"
                    >
                        <h3
                            className="text-xl font-bold"
                        >
                            Your Trip
                        </h3>
                        <div
                            className="my-4 flex items-center justify-between"
                        >
                            <h4
                                className="text-lg font-semibold my-2"
                            >
                                Dates
                            </h4>
                            <p>
                                {new Date(checkInDate).toLocaleDateString()} - {new Date(checkOutDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div
                            className="my-4 flex items-center justify-between"
                        >
                            <h4
                                className="text-lg font-semibold my-2"
                            >
                                Guests
                            </h4>
                            <p>
                                {numGuests}
                            </p>
                        </div>
                    </div>
                    <p 
                        className="text-sm text-slate-400 mt-5"
                    >
                        *** This is not a real payment system. Please do not enter real financial information. Click confirm reservation to continue ***
                    </p>
                    <h2
                        className="my-5 text-2xl font-semibold"
                    >
                        Payment
                    </h2>
                    {/* dummy payment system, users do not need to fill oout info to reserve a booking */}
                    <form>
                        <input
                            type="number"
                            placeholder="Card Number"
                            className="border w-full p-2 rounded-lg"
                        />
                        <div
                            className="flex"
                        >
                            <input
                                type="number"
                                placeholder="Expiration"
                                className="border w-full p-2 rounded-lg"
                            />
                            <input
                                type="number"
                                placeholder="CVV"
                                className="border w-full p-2 rounded-lg"
                            />
                        </div>
                        <input
                            type="number"
                            placeholder="ZIP Code"
                            className="border w-full p-2 rounded-lg mt-5"
                        />
                        <input
                            type="number"
                            placeholder="Country/Region"
                            className="border w-full p-2 rounded-lg mt-5"
                        />
                    </form>
                    <button
                        type="button"
                        className="bg-red py-3 px-6 text-white font-semibold rounded-lg mt-8"
                        onClick={(e) => confirmBooking(e)}
                    >
                        Confirm Reservation
                    </button>
                </div>
                <div
                    className="w-1/2 p-5 m-3 border-2 rounded-lg"
                >   
                    {listing &&
                    <>
                    <div
                        className="flex items-center gap-3 border-b-2 py-5"
                    >
                        <img 
                            className="h-28 rounded-lg" 
                            src={`http://localhost:5000/uploads/${listing?.photos?.[0]}`} 
                            alt="" 
                        />
                        <h2
                            className="font-semibold"
                        >
                            {listing.title}
                        </h2>
                    </div>
                    <PriceCalculator 
                        price={listing.price} 
                        checkIn={checkInDate} 
                        checkOut={checkOutDate}
                    />
                    </>
                    }
                </div>
            </div>
        </div>
    )
}

export default ConfirmReservation