import { useEffect, useState } from "react"
import { useLocation} from "react-router-dom"
import axios from "axios"

/* page with detailed and complete information on the user selected listing. User's can access this page by clicking on a listig either on the homepage or in their accounts  */
function ListingPage() {
    //extracting listing ID from url
    const location = useLocation()
    const id = location.pathname.split('/')[2]

    //state variable to store retrieved listing info
    const [ selectedListing, setSelectedListing ] = useState({})

    //fetching listing data from api
    useEffect(() => {
        const getSelectedListing = async() => {
            axios.get(`http://localhost:5000/listings/available/${id}`)
            .then(res => setSelectedListing(res.data))
        }
        getSelectedListing()
        console.log(selectedListing)
    }, [])

    //useeffect to get owner's name?
    
    return (
        <div>
            {selectedListing  
            ? 
            <>
                <h1>Hi, this is the listing page for listing id: {id}</h1>
                <h1>{selectedListing.title}</h1>
                <p>{selectedListing.location}</p>
                <p>{selectedListing.description}</p>
            </>
            : "Loading" }
        </div>
    )
}

export { ListingPage }