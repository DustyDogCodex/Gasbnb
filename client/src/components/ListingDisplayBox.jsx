import { Link } from "react-router-dom"

/* this is for displaying all available listings on the homepage. For listings displayed under my Rentals in the users account page, see UserListingDisplayBox */
function ListingDisplayBox({ listing }) {
    return (
        <Link
            to={`listing-page/${listing?._id}`}
            className="h-80 xl:h-96 m-3"
        >
            <img 
                className="w-full h-4/5 rounded-lg" 
                src={`https://gasbnb-production.up.railway.app/uploads/${listing?.photos[0]}`} 
                alt="listing cover image" 
            />

            <p
                className="mt-2 font-semibold text-sm text-wrap"
            >
                {listing?.title}
            </p>
            
            <p
                className="text-sm"
            >
                {listing?.location}
            </p>

            <p
                className="text-sm"
            >
                <span className="font-bold text-base">${listing?.price}</span> night
            </p>
        </Link>
    )
}

export default ListingDisplayBox