import { useForm } from "react-hook-form"
import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function Login() {
     //setting up react-hhok-form
    const { register, handleSubmit, formState: { errors } } = useForm()

    //state variables for email and password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //create post request to submit registration info
    async function loginUser(){
        await axios.post('http://localhost:5000/auth/login', 
            {
                email,
                password
            },
            { withCredentials: true}
        )
        .then(res => {
            if(res.data == 'ok'){
                window.location.replace('/')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div 
            className="flex items-center justify-center p-10 bg-stone-200 min-h-screen h-full"
        >   
            <div
                className="flex flex-col items-center justify-center bg-white p-16 rounded-lg"
            >
                {/* headings */}
                <h1
                    className="font-semibold font-mont text-3xl border-b border-b-red pb-3"
                >
                    Welcome to Gasbnb
                </h1>

                <h3
                    className="mt-5 text-xl font-semibold font-mont"
                >
                    Log in
                </h3>
            
                {/* login form */}
                <form
                    className="flex flex-col items-center justify-center border-b border-b-red"
                    onSubmit={handleSubmit(loginUser)}
                >
                    <input 
                        className="border-solid border-2 rounded-md p-2 mt-5"
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
                            {errors.email.type === "required" && "Email is required"}
                            {errors.email.type === "pattern" && "Invalid email address"}
                        </p>
                    )}

                    <input 
                        className="border-solid border-2 rounded-md p-2 mt-5"
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
                            {errors.password.type === "required" && "Password is required"}
                        </p>
                    )}

                    <button 
                        className="bg-red text-white px-8 py-2 rounded-md my-5 text-lg"
                        type="submit"
                    >
                        Continue
                    </button>
                </form>

                {/* forward to register page */}
                <div 
                    className="mt-5 font-mont flex flex-col items-center justify-center"
                >
                    <span>Don't have an account?</span>
                    <Link
                        to={'/register'}
                        className="mt-5 bg-sky-400 text-white text-lg px-8 py-2 rounded-lg"
                    >
                        Create an account
                    </Link>
                </div>
            </div>
        </div>
    )
}

export { Login }