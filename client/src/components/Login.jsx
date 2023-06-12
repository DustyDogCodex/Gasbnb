import { useForm } from "react-hook-form"
import { useState } from "react"
import axios from "axios"

function Login() {
     //setting up react-hhok-form
    const { register, handleSubmit, formState: { errors } } = useForm()

    //state variables for email and password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //create post request to submit registration info
    async function loginUser(e){
        try{
            await axios.post('http://localhost:5000/auth/login', 
                {
                    email,
                    password
                }
            )
            .then(res => console.log(res))
        }catch(err) {
            console.log(err)
        }
    }
    return (
        <div 
            className="flex flex-col items-center justify-center border-2"
        >   
            <h1
                className="font-semibold text-2xl border-b-2 pb-3"
            >
                Welcome to Gasbnb
            </h1>
            <h3
                className="mt-5 text-xl font-semibold"
            >
                Log in
            </h3>
            <form
                className="flex flex-col items-center justify-center"
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
                        {errors.email.type === "required" && "Email is required."}
                        {errors.email.type === "pattern" && "Invalid email address."}
                    </p>
                )}

                <input 
                    className="border-solid border-2 rounded-md p-2"
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
                >
                    Continue
                </button>
            </form>
        </div>
    )
}

export { Login }