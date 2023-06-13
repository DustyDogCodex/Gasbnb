import { Link } from 'react-router-dom'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function MyRentals() {
  return (
    <div>
        My rentals
        <div>
            <Link 
                to={'/account/rentals/new'}
                className='bg-red text-white px-4 py-2 rounded-full text-xl'
            >
               <FontAwesomeIcon icon={faPlus} /> Add new rental
            </Link>
        </div>
    </div>
  )
}

export { MyRentals }