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
            <form
                className="flex flex-col items-center justify-center"
                onSubmit={handleSubmit(registerUser)}
            >
                <input 
                    className="border-solid border-2 rounded-md p-2 my-2"
                    {...register("name", {
                        required: true
                    })}
                    type="text"
                    placeholder="Enter your name"  
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                    <p className="text-red mt-1">
                        {errors.email.type === "required" && "Name is required."}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                    <p className="text-red mt-1">
                        {errors.email.type === "required" && "Email is required."}
                        {errors.email.type === "pattern" && "Invalid email address."}
                    </p>
                )}

                <input 
                    className="border-solid border-2 rounded-md p-2 my-2"
                    {...register("password", {
                        required: true
                    })}
                    type="password"
                    placeholder="Enter your password"
                    value={password}  
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                    <p className="text-red mt-1">
                        {errors.password.type === "required" && "Password is required."}
                    </p>
                )}
                <button 
                    className="bg-red text-white px-8 py-2 rounded-md my-5"
                    type="submit"
                >
                    Continue
                </button>

                {/* Alert for duplicate email */}
                <Alert 
                    className="bg-yellow-300 text-red p-5 rounded-xl" 
                    show={emailAlert} 
                    onClose={() => setEmailAlert(false)} 
                    dismissible
                >
                    This email is already being used. Please choose a different email.
                </Alert>
            </form>
        </div>
    )
}

export { Register }