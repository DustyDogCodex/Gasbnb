import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWifi, faTv, faPaw, faDoorClosed, faCarSide, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useState } from "react"

function CreateNewRental() {
    //using react hook form for validation
    const { register, handleSubmit, formState: { errors } } = useForm()

    //state variable tracking all images currently queued for upload by user. 
    //These have not been submitted yet, but they will be displayed in the photo gallery below the photos section.
    //this is the final array of images that will be sent to the server after user clicks submit.
    const [ imageQueue, setImageQueue ] = useState([])

    //state variables for tracking image links submitted by user
    const [ imageLink, setImageLink ] = useState('')
    console.log(imageLink)

    //function to handle adding images that were submiited through a link
    function addLinkImages(e){
        e.preventDefault()
        axios.post("http://localhost:5000/listings/uploadimage-link",
            { imageLink: imageLink }
        )
        .then(res => {
            const fileName = res.data
            //add filename to current queue
            setImageQueue(prev => [...prev, fileName])
            //set image link input back to empty after successful upload
            setImageLink('')
        })
        .catch(err => console.log(err))
    }

    //function to handle images loaded through devices
    async function addDeviceImages(e){
        const images = e.target.files
        const data = new FormData()
        data.set('images', images)
        axios.post("http://localhost:5173/listings/uploadimage-device", 
            data,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        )
        .then(res => {
            const fileName = res.data
            setImageQueue(prev => {
                return [...prev, fileName]
            })
        })
    }

    return (
    <div>
        <form 
            className="w-4/5"
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
            <p
                className="text-sm text-stone-400 my-1"
            >
                You can upload photos by using a link to a image hosting website or directly from your device!
            </p>
            <div
                className="flex justify-between"
            >
                <input 
                    name="uploadimages-link"
                    className="w-4/5 border-2 p-2 rounded-lg"
                    type="text"
                    value={imageLink}
                    onChange={e => setImageLink(e.target.value)}
                    placeholder="Upload photos with a link" 
                />
                <button
                    type="button"
                    className="bg-red text-white text-xl py-2 px-4 rounded-full my-2"
                    onClick={addLinkImages}
                >
                    Add photo
                </button>
            </div>
            
            {/* gallery for displaying images queued up to be added to the listing by user */}
            <div
                className="mt-3 flex flex-wrap border-2 p-3 rounded-md"
            >
                {/* calling the saved files from our server if they have been uploaded already. if no images have been placed in the queue, a simple "add photos" will be displayed */}
                {/* server has a static folder with all uploaded images available at route /uploads/file-name.jpg */}
                {imageQueue.length > 0 ? imageQueue.map(photo => 
                    <img
                        className="max-w-[300px] max-h-[300px] rounded-xl m-1"
                        src={`http://localhost:5000/uploads/${photo}`}
                        alt="uploaded image"
                    />
                ) : 'Add photos' }

                <label
                    className="border-2 rounded-xl p-2 flex items-center gap-2 font-roboto font-semibold cursor-pointer text-stone-500 m-1"
                >
                    <FontAwesomeIcon 
                        icon={faCloudArrowUp} 
                        style={{height:'40px', width:'40px', color:'grey'}}
                    />
                    Upload images
                    <input 
                        className="hidden"
                        type="file" 
                        onChange={addDeviceImages}
                    />
                </label>
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