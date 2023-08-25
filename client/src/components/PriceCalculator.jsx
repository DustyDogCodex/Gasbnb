function PriceCalculator({ price, checkIn, checkOut }) {

    //calculating difference in days
    //difference in time divided by one week's worth of milliseconds. This gives the time difference in days
    //this will be used to calculate the total price of the reservation
    console.log('diff in days', (new Date(checkOut) - new Date(checkIn)) / (24 * 60 * 60 * 1000))
    console.log('price in price calculator', price)
    return (
        <>
            <div
                className="mt-5 grid grid-cols-[2fr_1fr] grid-rows-3 border-b-2 pb-3"
            >
                <p className="my-2">${price} x {(new Date(checkOut) - new Date(checkIn)) / (24 * 60 * 60 * 1000)} nights</p>
                <p className="my-2">${price * (new Date(checkOut) - new Date(checkIn)) / (24 * 60 * 60 * 1000)}</p>
                <p className="my-2">Cleaning Fee</p>
                <p className="my-2">$100</p>
                <p className="my-2">Gasbnb service fee</p>
                <p className="my-2">${Math.ceil(price * (new Date(checkOut) - new Date(checkIn)) / (24 * 60 * 60 * 1000) * 0.0420)}</p>
            </div>
            <div
                className="mt-5 grid grid-cols-[2fr_1fr] grid-row-1"
            >
                <p className="my-2 font-semibold">Total before taxes</p>
                <p className="my-2 font-semibold">${(price * (new Date(checkOut) - new Date(checkIn)) / (24 * 60 * 60 * 1000)) + 100 + Math.ceil(price * (new Date(checkOut) - new Date(checkIn)) / (24 * 60 * 60 * 1000) * 0.0420)}</p>
            </div>
        </>
    )
}

export default PriceCalculator