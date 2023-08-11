/* this is for listings created by a user that will be displayed in the user's account page, under the My rentals subpage. For the square boxes displayed on the homepage, go to ListingDisplayBox.jsx */

import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"

function UserListingDisplayBox({ userListing }) {
    
    //extracting listing info from userListing
    const { _id, title, location, photos } = userListing
    
    return (
        <div
            className="border p-3 bg-sky-200 rounded-lg flex items-center justify-between cursor-pointer" 
        >   
            {/* link to listing page for selected listing */}
            <Link
                to={`/listing-page/${_id}`}
                className="flex items-center"
            >
                <img 
                    className="w-28 h-28 rounded-lg mr-4"
                    src={`http://localhost:5000/uploads/${photos[0]}`} 
                    alt={`${title}'s image`} 
                />

                {/* title and location */}
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
            </Link>

            {/* edit or delete this post */}
            <div
                className="flex flex-col gap-2 m-2"
            >
                <Link
                    to={`edit/${_id}`}
                >
                    <FontAwesomeIcon 
                        icon={faPenToSquare} 
                        style={{color: "#0a9bf5", width:"25px", height:"25px"}} 
                    />
                </Link>
                <Link>
                    <FontAwesomeIcon 
                        icon={faTrash} 
                        style={{color: "#f50529", width:"25px", height:"25px"}} 
                    />
                </Link>
            </div>
        </div>
    )
}

export default UserListingDisplayBox