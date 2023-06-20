import { useForm } from "react-hook-form"

function ReservationWidget({ listing }) {

    //setting up dates to pass as default values to useForm
    const time = new Date()
    const today = time.toISOString().substring(0, 10)
    const oneWeekFromToday = Date.now() + 604800000 //one week in milliseconds
    const dateOneWeekFromToday = new Date(oneWeekFromToday).toISOString().substring(0,10)

    //react-hook-form for input validation and error handling
    const { register, handleSubmit, formState: { errors } } = useForm()

    //submit data
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
        </div>
    )
}

export default ReservationWidget