import { useForm } from "react-hook-form"

function ReservationWidget({ listing }) {

    //react-hook-form for input validation and error handling
    const { register, watch, handleSubmit, formState: { errors } } = useForm()

    //watching checkInDate and checkOutDate to calculate total price of selected reservation window
    const watchCheckIn = watch("checkInDate")
    const watchCheckOut = watch("checkOutDate")

    //setting up dates to pass as default values to useForm
    const time = new Date()
    const today = time.toISOString().substring(0, 10)
    const oneWeekFromToday = Date.now() + 604800000 //one week in milliseconds
    const dateOneWeekFromToday = new Date(oneWeekFromToday).toISOString().substring(0,10)

    //difference in time divided by one week's worth of milliseconds. This gives the time difference in days
    //this will be used to calculate the total price of the reservation
    let differenceInDays = (new Date(watchCheckOut) - new Date(watchCheckIn)) / (24 * 60 * 60 * 1000)  
    
    //submit data using react-hook-form
    async function submitReservation(data){
        console.log(data)
    }
    
    return (
        <div 
            className="m-3 border-2 rounded-lg p-3"
        >
            <h1>
                <strong className="text-2xl font-medium">${listing.price}</strong> night
            </h1>
            <form
                onSubmit={handleSubmit(submitReservation)}
            >
                <div
                    className="flex flex-col md:flex-row mt-5"
                >
                    <div
                        className="flex flex-col items-start border p-2"
                    >
                        <label className="text-xs font-semibold">Check-in</label>
                        <input
                            {...register("checkInDate", { required: true })}
                            type="date"
                            defaultValue={today}
                        />
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
                    </div>
                </div>
                <div
                    className="flex flex-col items-start border p-2"
                >
                    <label className="text-xs font-semibold">Guests</label>
                    <input 
                        {...register("NumGuests", { 
                            required: true, 
                            max: listing.maxGuests
                        })}
                        type="number" 
                        placeholder="1 guest"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-red w-full text-white font-bold py-3 rounded-lg mt-3"
                >
                    Reserve
                </button>
            </form>
            <div
                className="mt-5 grid grid-cols-[2fr_1fr] grid-rows-3 border-b-2 pb-3"
            >
                <p className="my-2">${listing.price} x {differenceInDays} nights</p>
                <p className="my-2">${listing.price * differenceInDays}</p>
                <p className="my-2">Cleaning Fee</p>
                <p className="my-2">$100</p>
                <p className="my-2">Gasbnb service fee</p>
                <p className="my-2">${Math.ceil(listing.price * differenceInDays * 0.0420)}</p>
            </div>
            <div
                className="mt-5 grid grid-cols-[2fr_1fr] grid-row-1"
            >
                <p className="my-2 font-semibold">Total before taxes</p>
                <p className="my-2">${(listing.price * differenceInDays) + 100 + Math.ceil(listing.price * differenceInDays * 0.0420)}</p>
            </div>
        </div>
    )
}

export default ReservationWidget