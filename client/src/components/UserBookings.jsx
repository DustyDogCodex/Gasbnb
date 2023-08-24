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
            className="w-full flex items-center justify-around bg-sky-200 rounded-lg my-3"
        >   
            {/* listing's cover image */}
            <img 
                className="h-36 w-1/3 rounded-lg"
                src={`https://gasbnb-production.up.railway.app/uploads/${listingId.photos[0]}`} 
                alt="booking cover image" 
            />

            {/* reservation info */}
            <div
                className="p-2 w-2/3"
            >
                {/* listing title */}
                <p
                    className="text-sm font-semibold sm:text-xl border-b-2 border-fuchsia-500 py-2"
                >
                    {listingId.title}
                </p>

                {/* dates for reservation */}
                <p
                    className="mt-2 flex items-center text-sm sm:text-base"
                >
                    <FontAwesomeIcon 
                        icon={faCalendar} 
                        style={{color: "#030208", marginRight:'10px', height:'20px', width:'20px'}} 
                    />
                    <span className="font-bold mr-1 text-xs sm:text-base">{new Date(checkInDate).toLocaleDateString()}</span> to <span className="font-bold ml-1 text-xs sm:text-base">{new Date(checkOutDate).toLocaleDateString()}</span>
                </p>

                {/* num of guests on reservation */}
                <p
                    className="mt-2 flex items-center text-sm sm:text-base"
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