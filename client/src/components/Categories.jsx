import { faArchway, faBeerMugEmpty, faCampground, faChampagneGlasses, faFire, faGhost, faHatCowboy, faIgloo, faLandmark, faMountain, faMugHot, faPersonBiking, faPersonHiking, faSailboat, faTractor, faUmbrellaBeach, faWater, faWaterLadder } from "@fortawesome/free-solid-svg-icons"
import CategoryBox from "./CategoryBox"
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons"

function Categories() {

    //list of available categories
    const categories = [
        {
            name: 'Beachfront',
            icon: faUmbrellaBeach
        },
        {
            name: 'Pools',
            icon: faWaterLadder
        },
        {
            name: 'Trending',
            icon: faFire
        },
        {
            name: 'Boats',
            icon: faSailboat
        },
        {
            name: 'Farms',
            icon: faTractor
        },
        {
            name: 'YEE-HAW',
            icon: faHatCowboy
        },
        {
            name: 'Winery',
            icon: faChampagneGlasses
        },
        {
            name: 'Brewery',
            icon: faBeerMugEmpty
        },
        {
            name: 'Camping',
            icon: faCampground
        },
        {
            name: 'Lakes',
            icon: faWater
        },
        {
            name: 'Hiking',
            icon: faPersonHiking
        },
        {
            name: 'Biking',
            icon: faPersonBiking
        },
        {
            name: 'Mountains',
            icon: faMountain
        },
        {
            name: 'Landmark',
            icon: faLandmark
        },
        {
            name: 'Monument',
            icon: faArchway
        },
        {
            name: 'Igloo',
            icon: faIgloo
        },
        {
            name: 'Haunted',
            icon: faGhost
        },
        {
            name: 'Kooky',
            icon: faRedditAlien
        },
        {
            name: 'Coffee',
            icon: faMugHot
        }
    ]

    return (
        <div
            className="w-full overflow-x-auto flex items-center justify-around py-3 px-8 border-b"
        >
            {categories.map((cat, index) => 
                <CategoryBox
                    key={index}
                    name={cat.name}
                    icon={cat.icon}
                />
            )}
        </div>
    )
}

export default Categories