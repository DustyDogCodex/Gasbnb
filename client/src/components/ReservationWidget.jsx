import { useForm } from "react-hook-form"

function ReservationWidget({ listing }) {
    //react-hook-form for input validation and error handling
    const { register, handleSubmit, formState: { errors } } = useForm()
    
    return (
        <div 
            className="m-3 border-2 rounded-lg p-3"
        >
            <h1>
                <strong className="text-xl">${listing.price}</strong> night
            </h1>
            <div
                className="border flex flex-col my-5"
            >
                <label>Check-in</label>
                <input
                    {...register("checkInDate", { required: true })}
                    type="date"
                />
                <label>Check-out</label>
                <input 
                    {...register("checkOutDate", { required: true })}
                    type="date"
                />
            </div>
            <div>
                <label>Guests</label>
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
                className="bg-red w-full text-white font-bold py-3 rounded-lg mt-3"
            >
                Reserve
            </button>
        </div>
    )
}

export default ReservationWidget