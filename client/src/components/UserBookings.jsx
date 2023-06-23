import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar } from "@fortawesome/free-regular-svg-icons"
import { faPeopleRoof } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'

function UserBookings({ booking }) {
    //extracting needed info from booking object
    const { _id, listingId, checkInDate, checkOutDate, numGuests } = booking

    return (
        <Link
            to={`/booking-page/${_id}`}
            className="w-full flex items-center justify-around bg-slate-400 rounded-lg"
        >
            <img 
                className="h-36 rounded-lg"
                src={`http://localhost:5000/uploads/${listingId.photos[0]}`} 
                alt="booking cover image" 
            />
            <div
                className="p-2"
            >
                <p
                    className="text-xl border-b-2 py-2"
                >
                    {listingId.title}
                </p>
                <p
                    className="mt-2 flex items-center"
                >
                    <FontAwesomeIcon 
                        icon={faCalendar} 
                        style={{color: "#030208", marginRight:'10px', height:'20px', width:'20px'}} 
                    />
                    {new Date(checkInDate).toLocaleDateString()} to {new Date(checkOutDate).toLocaleDateString()}
                </p>
                <p
                    className="mt-2 flex items-center"
                >
                    <FontAwesomeIcon 
                        icon={faPeopleRoof} 
                        style={{color: "#040113", marginRight:"10px", height:'20px', width:'20px'}} 
                    />
                    {numGuests} {numGuests > 1 ? 'Guests' : 'Guest'}
                </p>
            </div>
        </Link>
  )
}

export default UserBookings