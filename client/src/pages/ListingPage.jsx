import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faLocationDot, faWifi, faTv, faPaw, faDoorClosed, faCarSide, faUser } from "@fortawesome/free-solid-svg-icons"
import ReservationWidget from "../components/ReservationWidget"
import { NavBar } from '../components/NavBar'

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
            .catch(err => console.log(err))
        }
        getSelectedListing()
    }, []) 

    //useeffect to get owner's name?
    console.log('selected listing', selectedListing)

    //state variable to toggle showing more photos or not
    const [ showMore, setShowMore ] = useState(false)
    
    //show more photos modal
    //if user clicks on show more photos, a screen wide div will pop up that will show all the photos associated with this listing
    if(showMore){
        return (
            <div
                className="absolute bg-white flex flex-col items-center justify-center w-screen"
            >
                <div>
                    <div
                        className="flex items-center justify-between w-full mt-3"
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
                    <div>
                        {selectedListing?.photos?.length > 0 && selectedListing.photos.map(photo =>
                            <img 
                                key={photo}
                                src={`http://localhost:5000/uploads/${photo}`} 
                                alt="" 
                                className="rounded-lg my-2"
                            />    
                        )}
                    </div>
                </div>
            </div>
        )
    }

    /* function to convert checkin/checkout times from 24hr to 12 hr times */
    function MilitaryToStandardTime(time){
        const time_array = time.split(':')
        
        //determining if time is am or pm since values are military time/24hr time format
        const amOrPm = time_array[0] >= 12 ? 'PM' : 'AM'

        return(`${amOrPm == 'PM' ? Number(time_array[0]) - 12 : Number(time_array[0])}:${time_array[1]} ${amOrPm}`)
    }
    
    //function to load appropriate font awesome icon in amenities/What this place offers section
    function perksIcon(perk){
        switch(perk){
            case 'WiFi':
                return faWifi
            case 'TV':
                return faTv
            case 'Pets Allowed':
                return faPaw
            case 'Private Entrance':
                return faDoorClosed
            case 'Free Parking Spot':
                return faCarSide
        }
    }

    //splitting description + additional info at newline tags \n to allow text to be rendered the way it was inputed by the user
    //this variables will then be mapped and rendered with <br /> tags to display them properly
    const fixedDescription = selectedListing?.description?.split('\n')
    const fixedAdditionalInfo = selectedListing?.extraInfo?.split('\n')

    return (
        <>
            <NavBar />
            <div
                className="flex items-center justify-center p-5 bg-slate-200"
            >
                {selectedListing  
                    ? 
                        <div
                            className="p-3 bg-white rounded-lg xl:w-3/5"
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
                                className="underline text-sm md:text-base font-semibold flex items-center mt-1"
                            >   
                                <FontAwesomeIcon 
                                    icon={faLocationDot} 
                                    style={{color: "#050415", marginRight:'10px'}} 
                                />
                                {selectedListing.location}
                            </a>

                            {/* photo gallery */}
                            <div
                                className="grid grid-cols-[2fr_1fr] gap-2 my-5"
                            >
                    
                                {/* main image on left hand side */}
                                {selectedListing?.photos?.[0] && (
                                    <img 
                                        src={`http://localhost:5000/uploads/${selectedListing.photos[0]}`} 
                                        alt="main photo for listing" 
                                        className="aspect-square object-cover rounded-lg mr-3"
                                    />
                                )}
                    
                                {/* more images on right hand side */}
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

                                    {/* toggle show more modal for viewing all photos for listing */}
                                    <div
                                        className="absolute bottom-5 right-2 bg-slate-300/70 p-1 rounded-md cursor-pointer hover:bg-white"
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
                                    <div
                                        className="flex items-center justify-between mt-3 pb-3 border-b border-red"
                                    >
                                        <p
                                            className="text-lg md:text-2xl"
                                        >
                                            Listing hosted by <span className="font-bold font-mont">{selectedListing?.owner?.name}</span>
                                        </p>

                                        {/* if profile pic present, display it or otherwise display a default icon */}
                                        {selectedListing?.owner?.avatar
                                            ?
                                            <img 
                                                src={`http://localhost:5000/uploads/${selectedListing?.owner?.avatar}`} 
                                                alt={`${selectedListing?.owner?.name}'s profile picture`}
                                                className="w-14 h-14 rounded-full" 
                                            />
                                            :
                                            <FontAwesomeIcon 
                                                icon={faUser} 
                                                style={{color:'skyblue', height:'40px', width:'40px'}}     
                                            />
                                        }
                                    </div>

                                    <h2
                                        className="mt-5 text-lg md:text-2xl font-mont font-bold"
                                    >
                                        Description
                                    </h2>
                                
                                    <p
                                        className="mt-5"
                                    >
                                        {fixedDescription?.map((line,index) => 
                                            <p key={index}>
                                                {line}
                                                <br />
                                            </p>
                                        )}
                                    </p>

                                    {/* the additional information is displayed only if additional information is available about the listing */}
                                    {selectedListing.extraInfo && 
                                        <>
                                            <h3 
                                                className="mt-5 font-semibold text-base md:text-lg"
                                            >
                                                Additional information:
                                            </h3>

                                            <p
                                                className="mt-2"
                                            >
                                                {fixedAdditionalInfo?.map((line,index) => 
                                                    <p key={index}>
                                                        {line}
                                                        <br />
                                                    </p>)
                                                }
                                            </p>
                                        </>
                                    }
                                    
                                    {/* amenities/What this place offers */}
                                    <div>
                                        <h3
                                            className="mt-5 font-semibold text-base md:text-lg"
                                        >
                                            What this place offers
                                        </h3>

                                        <div
                                            className="flex flex-wrap p-3 mt-3 rounded-lg border border-fuchsia-300 w-fit"
                                        >
                                            {selectedListing?.amenities?.map((perk,index) => 
                                            <div
                                                key={index}
                                                className="flex items-center justify-center border-2 border-sky-300 p-2 rounded-md m-2"
                                            >
                                                <FontAwesomeIcon 
                                                    icon={perksIcon(perk)} 
                                                    style={{ margin:'8px' }}
                                                /> {perk}
                                            </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* checkin and checkout times */}
                                    <p
                                        className="mt-5"
                                    >
                                        <span className="mr-5 font-bold">Check In:</span> 
                                        {selectedListing.checkIn ? MilitaryToStandardTime(selectedListing.checkIn) : 'None'} 
                            
                                        <br/>
                            
                                        <span className="mr-5 font-bold">Check Out:</span> 
                                        {selectedListing.checkOut ? MilitaryToStandardTime(selectedListing.checkOut) : 'None'}
                                    </p>

                                    <p className="mt-5">
                                        <span className="mr-5 font-bold">Maximum number of guests:</span> {selectedListing.maxGuests}
                                    </p>
                                </div>

                                <ReservationWidget listing={selectedListing}/>
                            </div>
                        </div>
                    : 
                    "Loading"  
                }
            </div>
        </>
    )
}

export { ListingPage }