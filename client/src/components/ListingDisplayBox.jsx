/* this is for displaying all available listings on the homepage. For listings displayed under my Rentals in the users account page, see UserListingDisplayBox */
function ListingDisplayBox({ listing }) {
    //extracting all needed info from listing object
    const { location, photos } = listing

    return (
        <div
            className="m-4"
        >
            <img 
                className="w-80 h-80 rounded-lg" 
                src={`http://localhost:5000/uploads/${photos[0]}`} 
                alt="listing cover image" 
            />
            <p
                className="font-semibold text-sm mt-3"
            >
                {location}
            </p>
        </div>
    )
}

export default ListingDisplayBox