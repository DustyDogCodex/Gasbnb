/* this is for listings specific to a user that will be displayed in the user's account page, under the My rentals subpage. For the square boxes displayed on the homepage, go to ListingDisplayBox.jsx */

import { Link } from "react-router-dom"

function UserListingDisplayBox({ userListing }) {
    
    //extracting listing info from userListing
    const { _id, title, location, photos } = userListing
    
    return (
        <Link
            to={`/listing-page/${_id}`}
        >
            <div
                className="border p-3 bg-slate-300 rounded-lg flex items-center cursor-pointer" 
            >   
                <img 
                    className="w-28 h-28 rounded-lg mr-4"
                    src={`http://localhost:5000/uploads/${photos[0]}`} 
                    alt={`${title}'s image`} 
                />
                <div>
                    <h4
                        className="font-semibold"
                    >
                        {title}
                    </h4>
                    <p className="text-sm">
                        {location}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default UserListingDisplayBox