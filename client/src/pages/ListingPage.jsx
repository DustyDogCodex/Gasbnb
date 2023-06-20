import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

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
                    className="underline text-sm font-semibold"
                >
                    {selectedListing.location}
                </a>
                {/* photo gallery */}
                <div
                    className="grid gap-3 grid-cols-[2fr_1fr] my-3"
                >
                    <div>
                        {selectedListing.photos && (
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
                        {selectedListing.photos && (
                            <img 
                                src={`http://localhost:5000/uploads/${selectedListing.photos[1]}`} 
                                alt="second photo for listing" 
                                className="aspect-square object-cover rounded-lg"
                            />
                        )}
                        {selectedListing.photos && (
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
                <p>{selectedListing.description}</p>
            </div>
            : "Loading"  }
        </div>
    )
}

export { ListingPage }