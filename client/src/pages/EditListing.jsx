import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWifi, faTv, faPaw, faDoorClosed, faCarSide, faCloudArrowUp, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../UserContext"
import { useParams } from "react-router-dom"

function EditListing() {

    //using context to get user info
    //userInfo._id will be used to identify the user when a new listing is created
    const { userInfo } = useContext(UserContext)

    //retrieving listing info to pre fill input values
    const { listingId } = useParams()

    //since this is a listing that has already been created,
    //importing useForm's reset method to load listing data into the form after it is fetched from the server 
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    //state variable to store listing info
    const [ selectedListing, setSelectedListing ] = useState({})

    //state variable tracking all images currently queued for upload by user. 
    //These have not been submitted yet, but they will be displayed in the photo gallery below the photos section.
    //this is the final array of images that will be sent to the server after user clicks submit.
    const [ imageQueue, setImageQueue ] = useState([])

    //state variables for tracking image links submitted by user
    //this is tracking indivivual links being submitted by the user. After submission and successful download serverside, these links are added to imageQueue variable for being sent to the server and then stored in mongodb.
    const [ imageLink, setImageLink ] = useState('')

    //api call to fetch listing info
    useEffect(() => {
        const getListingInfo = async() => {
            axios.get(`http://localhost:5000/listings/available/${listingId}`)
            .then(res => { 
                setSelectedListing(res.data)
            })
        }
        getListingInfo()
    }, [])

    //useeffect to load photos once selectedListing is populated with listing data fetched from the server
    //additionally, this block is also using react-hook-forms reset method to populate form with user input once selectedListing is populated
    useEffect(() => {
        const loadPhotos = () => {
            selectedListing ? setImageQueue(selectedListing.photos) : ''
        }
        reset(selectedListing)
        loadPhotos()
    }, [selectedListing])

    //function to handle adding images that were submiited through a link
    function addLinkImages(e){
        e.preventDefault()
        axios.post("http://localhost:5000/listings/uploadimage-link",
            { imageLink }
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

        for(let i = 0; i < images.length; i++){
            data.append('images', images[i])
        }

        axios.post("http://localhost:5000/listings/uploadimage-device", 
            data,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        )
        .then(res => {
            //server will respond with file name of uploaded files. 
            //we can add them to our Image queue using the spread operator as we might be receiving multiple files together.
            const fileNames = res.data
            setImageQueue(prev => {
                return [...prev, ...fileNames]
            })
        })
        .catch(err => console.log(err))
    }

    //function for deleting photos from photo gallery
    function deletePhoto(photo){
        setImageQueue(imageQueue.filter(pic => pic !== photo))
    }

    //function for submitting data using react-hook-form
    function submitData(data){
        axios.put(`http://localhost:5000/listings/edit/${listingId}`,
            {
                ownerId: userInfo._id,
                data,
                imageQueue
            }
        )
        .then(res => {
            //if we get a successful response, we can navigate the user to their rentals page.
            if(res.data){
                window.location.replace('http://localhost:5173/account/rentals')
            }
        })
        .catch(err => console.log(err))
    }

    return (
    <div>
        { selectedListing 
        ? 
        <form 
            className="w-4/5"
            onSubmit={handleSubmit(submitData)}
        >   
            <h1>Please edit the information for yous listing below:</h1>
            <label>Title</label>
            <input 
                {...register("title", { required: true })}
                className="w-full border-2 p-2 rounded-lg"
                type="text"
                placeholder="My lovely apartment/house etc" 
            />
            <label>Price per night</label>
            <input 
                {...register("price", { required: true })}
                className="w-full border-2 p-2 rounded-lg"
                type="number"
                placeholder="$100 per night" 
            />
            <label>Location</label>
            <input 
                {...register("location", { required: true })}
                className="w-full border-2 p-2 rounded-lg"
                type="text"
                placeholder="Enter a location" 
            />
            <label>Description</label>
            <textarea
                {...register("description", { required: true, maxLength: 1000 })}
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
                {imageQueue && imageQueue.map(photo => 
                    <div 
                        key={photo}
                        className="flex relative"
                    >
                        <img
                            className="max-w-[300px] max-h-[300px] rounded-xl m-1"
                            src={`http://localhost:5000/uploads/${photo}`}
                            alt="uploaded image"
                        />
                        <div
                            className="absolute bottom-2 right-2 bg-white p-1 rounded-full flex items-center cursor-pointer"
                            onClick={() => deletePhoto(photo)}
                        >
                            <FontAwesomeIcon icon={faTrash} style={{color: "#f00000", height:"20px", width:"20px"}} />
                        </div>
                    </div>
                )}

                <label
                    className="border-2 rounded-xl p-2 flex items-center gap-2 font-roboto font-semibold cursor-pointer text-stone-500 m-1"
                >
                    <FontAwesomeIcon 
                        icon={faCloudArrowUp} 
                        style={{height:'40px', width:'40px', color:'grey'}}
                    />
                    Upload images
                    <input 
                        multiple
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
        : "Loading data..."}
    </div>
  )
}

export default EditListing