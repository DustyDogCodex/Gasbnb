/* this is for listings created by a user that will be displayed in the user's account page, under the My rentals subpage. For the square boxes displayed on the homepage, go to ListingDisplayBox.jsx */

import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { useState } from "react"

function UserListingDisplayBox({ userListing }) {
    
    //extracting listing info from userListing
    const { _id, title, location, photos } = userListing

    //toggle delete confirm
    const [ deleteConfirm, setDeleteConfirm ] = useState(false)

    //function for deleting listing
    function deleteListing(){
        axios.delete(`http://localhost:5000/listings/delete/${_id}`)
        .then(res => {
            if(res.status === 204){
                window.location.assign('/account/rentals')
            }
        })
        .catch(err => console.log(err))
    }
    
    return (
        <>
        <div 
            className="flex flex-col"
        >
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
                    <p 
                        className="text-sm"
                    >
                        {location}
                    </p>
                </div>
            </Link>

            {/* edit or delete this post */}
            <div
                className="flex flex-col gap-2 m-2"
            >
                {/* edit listing */}
                <Link
                    to={`edit/${_id}`}
                >
                    <FontAwesomeIcon 
                        icon={faPenToSquare} 
                        style={{color: "#0a9bf5", width:"25px", height:"25px"}} 
                    />
                </Link>

                {/* delete listing, route incoming */}
                <button
                    type="button"
                    onClick={() => setDeleteConfirm(!deleteConfirm)}
                >
                    <FontAwesomeIcon 
                        icon={faTrash} 
                        style={{color: "#f50529", width:"25px", height:"25px"}} 
                    />
                </button>
            </div>
        </div>
        </div>

        {/* confirm deleting this listing */}
        {deleteConfirm && (
                <div
                    className="flex items-center justify-center my-1"
                >
                    <div
                        className="flex flex-col w-fit bg-slate-300 p-2 rounded-lg"
                    >
                        <p>Are you sure you want to delete this listing?</p>
                        <div
                            className="flex items-center justify-evenly"
                        >
                            {/* on yes click, delete listing */}
                            <button 
                                className="bg-red p-1 rounded-lg text-white"
                                onClick={deleteListing}
                            >
                                Yes
                            </button>

                            {/* on no click, remove popup */}
                            <button 
                                className="bg-sky-300 p-1 rounded-lg text-white"
                                onClick={() => setDeleteConfirm(!deleteConfirm)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserListingDisplayBox