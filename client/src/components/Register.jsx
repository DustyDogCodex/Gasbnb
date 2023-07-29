import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Alert } from "react-bootstrap"
import { Navigate } from "react-router-dom"

function Register() {
    
    //setting up react-hhok-form
    const { register, handleSubmit, formState: { errors } } = useForm()

    //state variables for email and password
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    //if user uses an email that is already in our database, an alert will pop up
    const [emailAlert, setEmailAlert] = useState(false)

    //create post request to submit registration info
    async function registerUser(){
        await axios.post('http://localhost:5000/auth/register', {
            name,
            email,
            password
        })
        .then(res => {
            if(res.data == 'success'){
                <Navigate to="/login"/>
            } else if(res.data == 'failed') {
                setEmailAlert(true)
            } else {
                console.log(res.data)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div 
            className="flex flex-col items-center justify-center"
        >   
            <div
                className="flex flex-col items-center justify-center bg-white p-16 rounded-lg"
            >
                <h1
                    className="font-semibold text-2xl border-b-2 pb-3"
                >
                    Welcome to Gasbnb
                </h1>

                <h3
                    className="mt-5 text-xl font-semibold"
                >
                    Sign up
                </h3>
            
                {/* form for creating a new account */}
                <form
                    className="flex flex-col items-center justify-center"
                    onSubmit={handleSubmit(registerUser)}
                >
                    <input 
                        {...register("name", {
                            required: true
                        })}
                        type="text"
                        placeholder="Enter your name"  
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
                        placeholder="Enter your email"  
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
                        placeholder="Enter your password"
                    />
                    {errors.password && (
                        <p className="text-red mt-1">
                            {errors.password.type === "required" && "Password is required"}
                        </p>
                    )}

                    <button 
                        className="bg-red text-white px-8 py-2 rounded-md my-5"
                        type="submit"
                    >
                        Continue
                    </button>

                    {/* Alert for duplicate email */}
                    <p
                        className={`${emailAlert ? '' : 'hidden'} bg-yellow-300 text-red p-5 rounded-xl`}  
                        onClick={() => setEmailAlert(false)} 
                    >
                        This email is already being used. Please choose a different email.
                    </p>
                </form>
            </div>
        </div>
    )
}

export { Register }