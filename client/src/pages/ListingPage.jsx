import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import ReservationWidget from "../components/ReservationWidget"

/* page with detailed and complete information on the user selected listing. User's can access this page by clicking on a listig either on the homepage or in their accounts  */
function ListingPage() {
    //extracting listing ID from url
    const { listingId } = useParams()

    //state variable to store retrieved listing info
    const [ selectedListing, setSelectedListing ] = useState({})

    //fetching listing data from api
    useEffect(() => {
        const getSelectedListing = async() => {
            axios.get(`http://localhost:5000/listings/available/${listingId}`)
            .then(res => setSelectedListing(res.data))
        }
        getSelectedListing()
    }, []) 

    //useeffect to get owner's name?
    console.log(selectedListing)

    //state variable to toggle showing more photos or not
    const [ showMore, setShowMore ] = useState(false)
    
    //show more photos modal
    //if user clicks on show more photos, a screen wide div will pop up that will show all the photos associated with this listing
    if(showMore){
        return (
            <div
                className="absolute bg-white p-3"
            >
                <div
                    className="flex items-center justify-between w-full"
                >
                    <p 
                        className="font-robotoMono font-semibold text-xl"
                    >
                        All photos for {selectedListing.title}
                    </p> 
                    <FontAwesomeIcon 
                        icon={faXmark} 
                        style={{color: "#070212", cursor:"pointer", height:'40px', width:'40px'}} 
                        onClick={() => setShowMore(false)}    
                    />  
                </div>
                <div
                    className="p-3"
                >
                    {selectedListing?.photos?.length > 0 && selectedListing.photos.map(photo =>
                        <img 
                            key={photo}
                            src={`http://localhost:5000/uploads/${photo}`} 
                            alt="" 
                            className="rounded-lg m-2"
                        />    
                    )}
                </div>
            </div>
        )
    }

    /* function to convert checkin/checkout times from 24hr to 12 hr times */
    function MilitaryToStandardTime(time){
        const time_array = time.split(':')
        const amOrPm = time_array[0] >= 12 ? 'PM' : 'AM'
        return(`${Number(time_array[0]) - 12}:${time_array[1]} ${amOrPm}`)
    }
    
    return (
        <div>
            { selectedListing  
            ? 
            <div
                className="p-3"
            >
                <h1
                    className="text-3xl font-semibold"
                >
                    {selectedListing.title}
                </h1>
                {/* link to google maps result for given location */}
                <a 
                    href={`https://maps.google.com/?q=${selectedListing.location}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="underline text-sm font-semibold flex items-center gap-2"
                >   
                    <FontAwesomeIcon 
                        icon={faLocationDot} 
                        style={{color: "#050415",}} 
                    />
                    {selectedListing.location}
                </a>
                {/* photo gallery */}
                <div
                    className="grid gap-3 grid-cols-[2fr_1fr] my-3"
                >
                    <div>
                        {selectedListing?.photos?.[0] && (
                            <img 
                                src={`http://localhost:5000/uploads/${selectedListing.photos[0]}`} 
                                alt="main photo for listing" 
                                className="aspect-square object-cover rounded-lg"
                            />
                        )}
                    </div>
                    <div
                        className="grid relative"
                    >
                        {selectedListing?.photos?.[1] && (
                            <img 
                                src={`http://localhost:5000/uploads/${selectedListing.photos[1]}`} 
                                alt="second photo for listing" 
                                className="aspect-square object-cover rounded-lg"
                            />
                        )}
                        {selectedListing?.photos?.[2] && (
                            <img 
                                src={`http://localhost:5000/uploads/${selectedListing.photos[2]}`} 
                                alt="listing photo" 
                                className="aspect-square object-cover rounded-lg"
                            />
                        )}
                        <div
                            className="absolute bottom-2 right-2 bg-slate-300/70 p-1 rounded-md cursor-pointer"
                            onClick={() => setShowMore(true)}
                        >
                            Show more photos
                        </div>
                    </div>  
                </div>
                {/* this div contains listing related information and the reservation widget */}
                <div
                    className="flex"
                >
                    <div>
                        <p
                            className="mt-5"
                        >
                            {selectedListing.description}
                        </p>
                        {/* the additional information is displayed only if additional information is available about the listing */}
                        {selectedListing.extraInfo && 
                        <p
                            className="mt-5"
                        >
                            <h3 className="font-semibold">
                                Additional information:
                            </h3>
                            {selectedListing.extraInfo}
                        </p>}
                        <p
                            className="mt-5"
                        >
                            <strong>Check In:</strong> {selectedListing.checkIn ? MilitaryToStandardTime(selectedListing.checkIn) : 'None'} <br/>
                            <strong>Check Out:</strong> {selectedListing.checkOut ? MilitaryToStandardTime(selectedListing.checkOut) : 'None'}
                        </p>
                        <p className="mt-5">
                            <strong>Maximum number of guests:</strong> {selectedListing.maxGuests}
                        </p>
                    </div>
                    <ReservationWidget/>
                </div>
            </div>
            : "Loading"  }
        </div>
    )
}

export { ListingPage }