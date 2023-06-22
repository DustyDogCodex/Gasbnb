import { useParams } from "react-router-dom"

function ConfirmReservation() {
    //using useParams to identify passed parameters from listing page 
    const { checkInDate, checkOutDate, numGuests } = useParams()

    return (
        <div>
            checkInDate: {checkInDate}
            checkOutDate: {checkOutDate}
            numGuests: {numGuests}
        </div>
    )
}

export default ConfirmReservation