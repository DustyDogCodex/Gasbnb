import { useForm } from "react-hook-form"
import PriceCalculator from "./PriceCalculator"

function ReservationWidget({ listing }) {

    //react-hook-form for input validation and error handling
    const { register, watch, handleSubmit, formState: { errors }, trigger } = useForm({
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

    //submit function to submit form info and navigate to payment url ONLY after form info has been validated
    const onSubmit = async () => {
        //using react-hook-form's trigger to manually trigger form validation
        const isValid = await trigger()
        //if information is valid then navigate to payment url
        //if information is invalid, react-hook-form will display appropriate errors
        if (isValid) {
            window.location.assign(`/confirm-payment/${listing._id}/${watchCheckIn}/${watchCheckOut}/${watchNumGuests}`)
        }
    }
    
    return (
        <div 
            className="mt-3 ml-0 sm:ml-10 border-2 rounded-lg p-3 shadow-xl shadow-slate-300 h-fit w-full sm:w-fit"
        >
            <h1>
                <strong className="text-2xl font-bold">${listing.price}</strong> night
            </h1>

            {/* form for collecting reservation info */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div
                    className="flex flex-col md:flex-row mt-5"
                >
                    {/* checkin date */}
                    <div
                        className="flex flex-col items-start border p-2"
                    >
                        <label className="text-xs font-semibold">Check-in</label>
                        <input
                            {...register("checkInDate", { required: true, min: today })}
                            type="date"
                            defaultValue={today}
                            className="border border-sky-500 p-1 rounded-lg"
                        />
                        {errors.checkInDate && (
                            <p className="text-red text-sm text-center bg-amber-400 p-1 rounded-lg mt-1">
                                {errors.checkInDate.type === "required" && "A check-in date is required"}
                                {errors.checkInDate.type === "min" && "Check-in date cannot be in the past"}
                            </p>
                        )}

                    </div>
                    
                    {/* checkout dates */}
                    <div
                        className="flex flex-col items-start border p-2"
                    >
                        <label className="text-xs font-semibold">Check-out</label>
                        <input 
                            {...register("checkOutDate", { required: true })}
                            type="date"
                            defaultValue={dateOneWeekFromToday}
                            className="border border-sky-500 p-1 rounded-lg"
                        />
                        {errors.checkOutDate && (
                            <p className="text-red text-sm text-center bg-amber-400 p-1 rounded-lg mt-1">
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
                        className="border border-sky-500 p-1 rounded-lg"
                    />
                    {errors.numGuests && (
                        <p className="text-red text-sm text-center bg-amber-400 p-1 rounded-lg mt-1">
                            {errors.numGuests.type === "required" && "A check-in date is required"}
                            {errors.numGuests.type === "max" && `Listing only allows ${listing.maxGuests} guests`}
                        </p>
                    )}
                </div>

                {/* form submit button */}
                <button
                    type="submit"
                    className="bg-red w-full text-white font-bold py-3 rounded-lg mt-3 text-center cursor-pointer"
                >
                    Reserve
                </button>
            </form>
            
            {/* price calculator widget for calculating the price for selected dates */}
            <PriceCalculator 
                price={listing?.price} 
                checkIn={watchCheckIn ? watchCheckIn : today} 
                checkOut={watchCheckOut ? watchCheckOut : dateOneWeekFromToday} 
            />
        </div>
    )
}

export default ReservationWidget