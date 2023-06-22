import { useParams } from "react-router-dom"

function ConfirmReservation() {
    //using useParams to identify passed parameters from listing page 
    const { checkInDate, checkOutDate, numGuests } = useParams()

    return (
        <div 
            className="w-screen h-screen p-10 flex item-center justify-center"
        >
            <div
                className="flex lg:w-4/5 lg:items-center lg:justify-center border-4 border-emerald-700"
            >
                <div
                    className="w-1/2 p-5 border-2 border-red "
                >   
                    <h1
                        className="text-3xl"
                    >
                        Request to book
                    </h1>
                    <div
                        className="mt-8 border-b-2"
                    >
                        <h3
                            className="text-xl font-bold"
                        >
                            Your Trip
                        </h3>
                        <div
                            className="my-4 flex items-center justify-between"
                        >
                            <h4
                                className="text-lg font-semibold my-2"
                            >
                                Dates
                            </h4>
                            <p>
                                {new Date(checkInDate).toLocaleDateString()} - {new Date(checkOutDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div
                            className="my-4 flex items-center justify-between"
                        >
                            <h4
                                className="text-lg font-semibold my-2"
                            >
                                Guests
                            </h4>
                            <p>
                                {numGuests}
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="w-1/2"
                >
                    price details
                </div>
            </div>
        </div>
    )
}

export default ConfirmReservation