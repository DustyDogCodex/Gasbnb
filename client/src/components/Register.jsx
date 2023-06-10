function Register() {
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
        >Sign up</h3>
        <form
            className="flex flex-col items-center justify-center"
        >
            <input 
                className="border-solid border-2 rounded-md p-2 mt-5"
                name="email"
                type="email"
                placeholder="Enter your email"  
            />
            <input 
                className="border-solid border-2 rounded-md p-2 mb-5"
                name="password"
                type="password"
                placeholder="Enter your password"  
            />
            <button 
                className="bg-red text-white px-8 py-2 rounded-md mb-5"
            >
                Continue
            </button>
        </form>
    </div>
  )
}

export { Register }