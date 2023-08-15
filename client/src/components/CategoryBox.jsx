import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function CategoryBox({ name, icon }) {
    return (
        <div
            className="flex flex-col items-center justify-center mx-5 p-2 rounded-full cursor-pointer transition duration-300 hover:bg-slate-400/50 hover:text-white"
        >
            <FontAwesomeIcon
                icon={icon}
                style={{ color:'grey', height:'20px', width:'20px' }}
            />
            <span className="text-xs font-semibold">{name}</span>
        </div>
    )
}

export default CategoryBox