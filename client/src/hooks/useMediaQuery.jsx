import { useState, useEffect } from "react"

//creating a custom hook for watching and updating media queries as different components will respond to different media breakpoints.
const useMediaQuery = (query) => {
    //watching for when screen hits a partiuclar media breakpoint so the website can respond to it.
    const [ matches, setMatches ] = useState(false)

    useEffect(() => {
        //finding and storing media query object using matchMedia() method in media variable
        //this will be used to update media queries as user browses through the website
        const media = window.matchMedia(query)

        //if current media query is not the same as the one stored in state variable matches, we update it 
        //this is done to grab the media query for the window when the website loads for the first time on a user's browser
        if( media.matches !== matches ){
            setMatches(media.matches)
        }

        //once the initial media queries for a screen are acquired, any resizing of the window/screen needs to update the current media query.
        //this is done through the event listeners below
        const listener = () => setMatches(media.matches)
        //setting matches to cuurent media query when window is resized
        window.addEventListener("resize", listener)

        //removing eventListener because its only needed when window is resized
        return () => window.removeEventListener("resize", listener)
    }, [ matches, query ])

    return matches
}

export default useMediaQuery