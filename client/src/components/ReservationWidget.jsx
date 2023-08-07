import { useForm } from "react-hook-form"
import { Link, Navigate } from "react-router-dom"
import PriceCalculator from "./PriceCalculator"

function ReservationWidget({ listing }) {

    //react-hook-form for input validation and error handling
    const { register, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            numGuests: 1
        }
    })

    //watching checkInDate and checkOutDate to calculate total price of selected reservation window
    const watchCheckIn = watch("checkInDate")
    const watchCheckOut = watch("checkOutDate")
    const watchNumGuests = watch("numGuests")

    //setting up dates to pass as default values to useForm
    const time = new Date()
    const today = time.toISOString().substring(0, 10)
    const oneWeekFromToday = Date.now() + 604800000 //one week in milliseconds
    const dateOneWeekFromToday = new Date(oneWeekFromToday).toISOString().substring(0,10)

    function validateInfo() {
        return <Navigate to={`/confirm-payment/${listing._id}/${watchCheckIn}/${watchCheckOut}/${watchNumGuests}`} />
    }
    
    return (
        <div 
            className="m-3 border-2 rounded-lg p-3 shadow-xl shadow-slate-300"
        >
            <h1>
                <strong className="text-2xl font-bold">${listing.price}</strong> night
            </h1>

            {/* form for collecting reservation info */}
            <form onSubmit={handleSubmit(validateInfo)}>
                <div
                    className="flex flex-col md:flex-row mt-5"
                >
                    {/* checkin/checkout dates */}
                    <div
                        className="flex flex-col items-start border p-2"
                    >
                        <label className="text-xs font-semibold">Check-in</label>
                        <input
                            {...register("checkInDate", { required: true })}
                            type="date"
                            defaultValue={today}
                        />
                        {errors.checkInDate && (
                            <p className="text-red mt-1">
                                {errors.checkInDate.type === "required" && "A check-in date is required"}
                            </p>
                        )}

                    </div>

                    <div
                        className="flex flex-col items-start border p-2"
                    >
                        <label className="text-xs font-semibold">Check-out</label>
                        <input 
                            {...register("checkOutDate", { required: true })}
                            type="date"
                            defaultValue={dateOneWeekFromToday}
                        />
                        {errors.checkOutDate && (
                            <p className="text-red mt-1">
                                {errors.checkOutDate.type === "required" && "A check-out date is required"}
                            </p>
                        )}
                    </div>
                </div>

                {/* num of guests */}
                <div
                    className="flex flex-col items-start border p-2"
                >
                    <label className="text-xs font-semibold">Guests</label>
                    <input 
                        {...register("numGuests", { 
                            required: true, 
                            max: listing.maxGuests
                        })}
                        type="number" 
                        placeholder="1 guest"
                    />
                    {errors.numGuests && (
                        <p className="text-red mt-1">
                            {errors.numGuests.type === "required" && "A check-in date is required"}
                            {errors.numGuests.type === "max" && `Listing only allows ${listing.maxGuests} guests`}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-red w-full text-white font-bold py-3 rounded-lg mt-3 text-center cursor-pointer"
                >
                    Reserve
                </button>
            </form>

            <PriceCalculator 
                price={listing.price} 
                checkIn={watchCheckIn} 
                checkOut={watchCheckOut} 
            />
        </div>
    )
}

export default ReservationWidget