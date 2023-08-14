import { useContext } from "react"
import { UserContext } from "../UserContext"
import AccountInfo from "../components/AccountInfo"
import axios from "axios"

function Profile() {
     //getting userInfo from context
    const { userInfo } = useContext(UserContext)

    //function to logout user
    async function logout(){
        await axios.get(
            'http://localhost:5000/auth/logout',
            { withCredentials: true }
        )
        .then(res => {
            if(res.data){
                window.location.replace('/')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div
            className="flex flex-col items-center justify-center"
        >
            <h1
                className="text-2xl mb-3 font-mont"
            >
                Account
            </h1>

            <p
                className="mb-5"
            >
                <span 
                    className="text-indigo-500 text-xl font-robotoMono font-semibold">{userInfo?.name}
                </span>,
                <span 
                    className="text-indigo-500 text-md font-robotoMono font-semibold ml-3">{userInfo?.email}
                </span>
            </p> 

            {/* user account info */}
            <div
                className="flex flex-col items-center justify-start p-5"
            >
                <h2 
                    className="text-2xl border-b-2 border-fuchsia-300"
                >
                    Personal Info
                </h2>
                
                <AccountInfo info={"Legal Name"} value={userInfo.name} />
                <AccountInfo info={"Email address"} value={userInfo.email} />
                <AccountInfo info={"Profile Picture"} value={userInfo.avatar} />
            </div>

            {/* logout button */}
            <button
                type="button"
                className="bg-red text-white rounded-full text-2xl px-6 py-2 mt-5"
                onClick={logout}
            >
                Log Out
            </button>
        </div>
    )
}

export { Profile }