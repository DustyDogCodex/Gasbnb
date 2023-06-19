import { Link } from "react-router-dom"

/* this is for displaying all available listings on the homepage. For listings displayed under my Rentals in the users account page, see UserListingDisplayBox */
function ListingDisplayBox({ listing }) {
    //extracting all needed info from listing object
    const { _id, title, location, photos } = listing
    console.log(listing)

    return (
        <Link
            to={`listing-page/${_id}`}
            className="m-4 w-80 max-h-96"
        >
            <img 
                className="w-80 h-80 rounded-lg" 
                src={`http://localhost:5000/uploads/${photos[0]}`} 
                alt="listing cover image" 
            />
            <p
                className="mt-2 font-semibold text-wrap max-w-80"
            >
                {title}
            </p>
            <p
                className="text-sm"
            >
                {location}
            </p>
        </Link>
    )
}

export default ListingDisplayBox