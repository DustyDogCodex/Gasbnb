function ErrorMessages({ message }) {
    return (
        <p
            className="text-red bg-amber-300 my-1 p-1 rounded-lg text-center"
        >
            {message}
        </p>
    )
}

export default ErrorMessages