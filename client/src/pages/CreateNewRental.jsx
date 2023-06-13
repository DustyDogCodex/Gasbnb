import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWifi, faTv, faPaw, faDoorClosed, faCarSide } from "@fortawesome/free-solid-svg-icons"
import { useForm } from "react-hook-form"

function CreateNewRental() {
    //using react hook form for validation
    const { register, handleSubmit, formState: { errors } } = useForm()

    return (
    <div>
        <form 
            className="w-4/5 "
            onSubmit={handleSubmit((data) => {
                console.log(data)
            })}
        >   
            <h1>Please add information for your new listing:</h1>
            <label>Title</label>
            <input 
                {...register("title", { required: true })}
                className="w-full border-2 p-2 rounded-lg"
                type="text"
                placeholder="My lovely apartment/house etc" 
            />
            <label>Address</label>
            <input 
                {...register("address", { required: true })}
                className="w-full border-2 p-2 rounded-lg"
                type="text"
                placeholder="Enter an address" 
            />
            <label>Description</label>
            <textarea
                {...register("description", { required: true, maxLength: 500 })}
                className="w-full border-2 p-2 rounded-lg"
                type="text"
                placeholder="A brief description of your rental" 
            />
            <label>Additional Information</label>
            <textarea
                {...register("extraInfo")}
                className="w-full border-2 p-2 rounded-lg"
                type="text"
                placeholder="Any additional information for guests. Ex:house rules, check-in procedure etc" 
            />
            <label>Amenities</label>
            <div
                className="flex flex-col checkbox"
            >
                <label 
                    className="border-2 py-2 pr-10 w-1/3 rounded-md m-2 cursor-pointer"
                >
                    <input 
                        {...register("checkbox")}
                        type="checkbox"
                        className="m-2"  
                        value="WiFi"  
                    />
                    <FontAwesomeIcon icon={faWifi} /> WiFi
                </label>

                <label
                    className="border-2 py-2 pr-10 w-1/3 rounded-md m-2 cursor-pointer"
                >
                    <input 
                        {...register("checkbox")}
                        type="checkbox"
                        className="m-2"
                        value="TV"    
                    />
                    <FontAwesomeIcon icon={faTv} /> TV
                </label>

                <label
                    className="border-2 py-2 pr-10 w-1/3 rounded-md m-2 cursor-pointer"
                >
                    <input 
                        {...register("checkbox")}
                        type="checkbox"
                        className="m-2"  
                        value="Pets Allowed"   
                    />
                    <FontAwesomeIcon icon={faPaw} /> Pets Allowed
                </label>

                <label
                    className="border-2 py-2 pr-10 w-1/3 rounded-md m-2 cursor-pointer"
                >
                    <input 
                        {...register("checkbox")}
                        type="checkbox"
                        className="m-2" 
                        value="Private Entrance"    
                    />
                    <FontAwesomeIcon icon={faDoorClosed} /> Private Entrance
                </label>

                <label
                    className="border-2 py-2 pr-10 w-1/3 rounded-md m-2 cursor-pointer"
                >
                    <input
                        {...register("checkbox")} 
                        type="checkbox"
                        className="m-2" 
                        value="Free Parking Spot"    
                    />
                    <FontAwesomeIcon icon={faCarSide} /> Free Parking Spot
                </label>

            </div>
            <label>Check In</label>
            <input 
                {...register("checkIn")} 
                className="w-full border-2 p-2 rounded-lg"
                type="time"
                placeholder="Check in times" 
            />
            <label>Check Out</label>
            <input 
                {...register("checkOut")}
                className="w-full border-2 p-2 rounded-lg"
                type="time"
                placeholder="Check out times" 
            />
            <label>Maximum number of guests allowed</label>
            <input 
                {...register("maxGuests")}
                className="w-full border-2 p-2 rounded-lg"
                type="number"
                placeholder="How many people are allowed to be here at one time" 
            />
            <label>Photos</label>
            <div
                className="flex justify-between"
            >
                <input 
                    className="w-4/5 border-2 p-2 rounded-lg"
                    type="text"
                    placeholder="Upload photos with a link" 
                />
                <button
                    type="button"
                    className="bg-red text-white text-xl py-2 px-4 rounded-full my-2"
                >
                    Add photo
                </button>
            </div>
            <span>------ OR ------</span>
            <input 
                className="w-full border-2 p-2 rounded-lg"
                type="file" 
            />
            
            <div
                className="grid grid-cols-3 lg:grid-cols-6 mt-5 border-2 p-3 rounded-md"
            >
                photo gallery
            </div>
            <div
                className="flex items-center justify-center mt-8"
            >
                <button 
                    type="submit"
                    className="bg-red text-white text-2xl py-2 px-4 rounded-full self-center"    
                >
                    Save
                </button>
            </div>
            
        </form>
    </div>
  )
}

export default CreateNewRental