import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { NavBar } from "../components/NavBar"

function Register() {    
    //setting up react-hhok-form
    const { register, handleSubmit, formState: { errors } } = useForm()

    //if user uses an email that is already in our database, an alert will pop up
    const [ emailAlert, setEmailAlert ] = useState(false)
    
    //variable for tracking user file upload
    const [ image, setImage ] = useState('')

    //create post request to submit registration info
    //data is the data object from react-hook forms
    async function registerUser(data){
        //form data to append image if user uploads a profile pic
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("email", data.email)
        formData.append("password", data.password)
        
        //if user has uploaded an image for their profile pic, append that to formdata object
        if(image){
            formData.append('image', image)
        }

        //post request
        axios.post('http://localhost:5000/auth/register', 
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            },
            { withCredentials: true }
        )
        .then(res => {
            if(res.data == 'success'){
                window.location.replace('/login')
            } else if(res.data == 'failed') {
                setEmailAlert(true)
            }
        })
        .catch(err => { 
            console.log(err)
            //if failed, post invalid email alert and console.log errr status
            setInvalidEmail(true)
            setTimeout(() => {
                setInvalidEmail(false)
            }, 5000) 
        })
    }

    return (
        <>
        <NavBar/>
        <div 
            className="flex items-center justify-center p-10 bg-stone-200 min-h-screen h-full"
        >   
            <div
                className="flex flex-col items-center justify-center bg-white p-16 rounded-lg"
            >
                <h1
                    className="font-semibold font-mont text-3xl border-b border-b-red pb-3"
                >
                    Welcome to Gasbnb
                </h1>

                <h3
                    className="mt-5 text-xl font-semibold font-mont"
                >
                    Sign up
                </h3>
            
                {/* form for creating a new account */}
                <form
                    className="flex flex-col items-center justify-center border-b border-b-red"
                    onSubmit={handleSubmit(registerUser)}
                >
                    <input 
                        {...register("name", {
                            required: true
                        })}
                        type="text"
                        placeholder="Name"  
                        className="border-solid border-2 rounded-md p-2 my-2"
                    />
                    {errors.name && (
                        <p className="text-red bg-amber-400 p-1 mt-2 rounded-lg">
                            {errors.email.type === "required" && "Name is required"}
                        </p>
                    )}

                    <input 
                        className="border-solid border-2 rounded-md p-2 my-2"
                        {...register("email", {
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        })}
                        type="email"
                        placeholder="Email"  
                    />
                    {errors.email && (
                        <p className="text-red mt-1">
                            {errors.email.type === "required" && "Email is required"}
                            {errors.email.type === "pattern" && "Invalid email address"}
                        </p>
                    )}

                    <input 
                        className="border-solid border-2 rounded-md p-2 my-2"
                        {...register("password", {
                            required: true
                        })}
                        type="password"
                        placeholder="Choose a password"
                    />
                    {errors.password && (
                        <p className="text-red mt-1">
                            {errors.password.type === "required" && "Password is required"}
                        </p>
                    )}

                    <label className="text-slate-400">Profile Picture</label>
                    <input 
                        className="border-solid border-2 rounded-md p-2 my-2"
                        name="image"
                        type="file"
                        onChange={e => setImage(e.target.files[0])}
                    />

                    <button 
                        className="bg-red text-white px-8 py-2 rounded-md my-5"
                        type="submit"
                    >
                        Register
                    </button>

                    {/* Alert for duplicate email */}
                    <p
                        className={`${emailAlert ? '' : 'hidden'} bg-yellow-300 text-red p-5 rounded-xl`}  
                        onClick={() => setEmailAlert(false)} 
                    >
                        This email is already being used. Please choose a different email.
                    </p>
                </form>

                {/* forward to login page */}
                <div 
                    className="mt-5 font-mont flex flex-col items-center justify-center"
                >
                    <span>Already have an account?</span>
                    <Link
                        to={'/login'}
                        className="mt-5 bg-sky-400 text-white text-lg px-8 py-2 rounded-lg"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}

export { Register }