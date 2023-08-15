import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faCheck, faXmark, faUser } from "@fortawesome/free-solid-svg-icons"
import ErrorMessages from '../components/ErrorMessages'
import { useForm } from "react-hook-form"

function Profile() {
    //getting userInfo from context
    const { userInfo } = useContext(UserContext)

    //variables to track user input
    const { register, handleSubmit, formState: { errors }} = useForm()
    const [ profilePic, setProfilePic ] = useState('')

    //toggle inputs to edit user info
    const [ editName, setEditName ] = useState(false)
    const [ editEmail, setEditEmail ] = useState(false)
    const [ editPicture, setEditPicture ] = useState(false)

    //api calls for updating user settings
    async function updateName(data){
        axios.put(`http://localhost:5000/settings/name`,
            { userId: userInfo._id, name: data.name },
            { withCredentials: true }
        )
        .then(res => 
            {
                if (res) { 
                    window.location.reload()
                }
            }
        )
        .catch(err => console.log(err))
    }

    async function updateEmail(data){
        axios.put(`http://localhost:5000/settings/email`,
            { userId: userInfo._id, email: data.email },
            { withCredentials: true }
        )
        .then(res => 
            {
                if (res) { 
                    window.location.reload()
                }
            }
        )
        .catch(err => console.log(err))
    }

    async function updateProfilePic(){
        //submitting formData with uploaded image to update post
        const formData = new FormData()
        
        formData.append('userId', userInfo._id)
        
        if(profilePic){
            formData.append("image", profilePic)
        }

        //sending patch request to update post info on server
        axios.put(`http://localhost:5000/settings/profilepic`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            },
            { withCredentials: true } 
        )
        .then(res => {
            if(res){
                window.location.reload()
            }
        })
        .catch(err => console.log(err))
    }

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
                className="text-2xl mb-3 border-b border-red"
            >
                Account
            </h1>

            {/* account owner's name and email */}
            <p
                className="mb-5 flex flex-col items-center"
            >
                <span 
                    className="text-indigo-500 text-base sm:text-xl font-robotoMono font-semibold">{userInfo?.name}
                </span>
                <span 
                    className="text-indigo-500 text-sm sm:text-md font-robotoMono font-semibold ml-3">{userInfo?.email}
                </span>
            </p> 

            {/* account info with options to edit and update it */}
            <div
                className="mt-5 flex items-center justify-between w-full sm:w-3/5 pb-4 border-b border-fuchsia-500"
            >
                <label className="font-bold text-xl">Name</label>
                <div
                    className={`${editName ? 'hidden' : ''} flex items-center justify-around`}
                >
                        <p 
                            className="ml-2 dark:text-white"
                        >
                            {userInfo.name}
                        </p>
                        <FontAwesomeIcon 
                            icon={faPenToSquare} 
                            style={{color: "indigo", cursor:'pointer', marginLeft:'10px'}} 
                            onClick={() => setEditName(!editName)}
                        />
                </div>

                {/* this section will be displayed after user clicks the edit button first */}
                <div
                    className={`${editName ? '' : 'hidden'}`}
                >
                    <div>
                        <input 
                            type="text"
                            {...register('name', { required: true })}
                            className="rounded-lg p-1 border border-sky-300 ml-3"
                        />
                    
                        <FontAwesomeIcon 
                            icon={faCheck} 
                            style={{color: "#05fa2e", cursor:'pointer', marginLeft:'5px'}} 
                            onClick={handleSubmit(updateName)}
                        />
                        <FontAwesomeIcon 
                            icon={faXmark} 
                            style={{color: "#ff0000", cursor:'pointer', marginLeft:'5px'}}
                            onClick={() => setEditName(!editName)} 
                        />
                    </div>
                    {/* error messages */}
                    {errors.name && (
                        <ErrorMessages message={'Name is required'} />
                    )}
                </div>
            </div>

            <div
                className="mt-5 flex items-center justify-between w-full sm:w-3/5 pb-4 border-b border-fuchsia-500"
            >
                <label className="font-bold text-xl">Email</label>
                <div
                    className={`${editEmail ? 'hidden' : ''} flex items-center justify-around`}
                >
                    <p 
                        className="ml-5 dark:text-white"
                    >
                        {userInfo.email}
                    </p>
                    <FontAwesomeIcon 
                        icon={faPenToSquare} 
                        style={{color: "indigo", cursor:'pointer', marginLeft:'10px'}} 
                        onClick={() => setEditEmail(!editEmail)}
                    />
                </div>

                {/* this section will be displayed after user clicks the edit button first */}
                <div
                    className={`${editEmail ? '' : 'hidden'}`}
                >
                    <div>
                        <input 
                            type="text"
                            {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                            className="rounded-lg p-1 border border-sky-300"
                        />
                        <FontAwesomeIcon 
                            icon={faCheck} 
                            style={{color: "#05fa2e", cursor:'pointer', marginLeft:'5px'}}
                            onClick={updateEmail} 
                        />
                        <FontAwesomeIcon 
                            icon={faXmark} 
                            style={{color: "#ff0000", cursor:'pointer', marginLeft:'5px'}}
                            onClick={() => setEditEmail(!editEmail)} 
                        />
                    </div>
                    {/* error messages */}
                    {errors.email && (
                        <div>
                            {errors.email.type == 'required' && <ErrorMessages message={'Email is required'} />}
                            {errors.email.type == 'pattern' && <ErrorMessages message={'Please enter a valid email'} />}
                        </div>
                    )}
                </div>
            </div>

            <div
                className="mt-5 flex items-center justify-between w-full sm:w-3/5 pb-4 border-b border-fuchsia-500"
            >
                        <label className="font-bold text-xl">Profile Picture</label>
                        
                        <div
                            className={`${editPicture ? 'hidden' : ''} flex items-center justify-around`}
                        >
                            {/* if user has an avatar, its displayed, otherwise a default icon is displayed */}
                            {userInfo.avatar
                                ?
                                (
                                    <img 
                                        src={`http://localhost:5000/uploads/${userInfo.avatar}`} 
                                        alt="user profile picture" 
                                        className="w-48 h-48 rounded-lg ml-3 sm:ml-10"
                                    />
                                )
                                :
                                (
                                    <FontAwesomeIcon 
                                        icon={faUser} 
                                        style={{color: "grey", height:'50px', width:'50px'}}
                                    />
                                )
                            }
                            <FontAwesomeIcon 
                                icon={faPenToSquare} 
                                style={{color: "indigo", cursor:'pointer', marginLeft:'10px'}}
                                onClick={() => setEditPicture(!editPicture)}
                            />
                        </div>

                        {/* this section will be displayed after user clicks the edit button first */}
                        <div
                            className={`${editPicture ? '' : 'hidden'}`}
                        >
                            <input 
                                type="file"
                                onChange={(e) => setProfilePic(e.target.files[0])}
                                className="rounded-lg p-1 border border-sky-500 w-4/5"
                            />
                            <FontAwesomeIcon 
                                icon={faCheck} 
                                style={{color: "#05fa2e", cursor:'pointer', marginLeft:'5px'}} 
                                onClick={updateProfilePic}
                            />
                            <FontAwesomeIcon 
                                icon={faXmark} 
                                style={{color: "#ff0000", cursor:'pointer', marginLeft:'5px'}}
                                onClick={() => setEditPicture(!editPicture)} 
                            />
                        </div>
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