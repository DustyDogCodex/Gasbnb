import { Link } from "react-router-dom"

/* this is for displaying all available listings on the homepage. For listings displayed under my Rentals in the users account page, see UserListingDisplayBox */
function ListingDisplayBox({ listing }) {
    //extracting all needed info from listing object
    const { _id, title, location, price, photos } = listing

    return (
        <Link
            to={`listing-page/${_id}`}
            className="h-80 xl:h-96 m-3"
        >
            <img 
                className="w-full h-4/5 rounded-lg" 
                src={`http://localhost:5000/uploads/${photos[0]}`} 
                alt="listing cover image" 
            />

            <p
                className="mt-2 font-semibold text-wrap"
            >
                {title}
            </p>
            
            <p
                className="text-sm"
            >
                {location}
            </p>

            <p
                className="text-sm"
            >
                <span className="font-bold text-base">${price}</span> night
            </p>
        </Link>
    )
}

export default ListingDisplayBox