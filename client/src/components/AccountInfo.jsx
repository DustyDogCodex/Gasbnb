function AccountInfo({ info, value }) {
  return (
    <div 
        className="flex items-start justify-between border-b-2 py-5 px-10 w-full"
    >
        <p className="font-semibold mr-5">{info}</p>
        {info === 'Profile Picture'
            ?
            <img 
                src={`http://localhost:5000/uploads/${value}`} 
                alt='users profile picture' 
                className="w-36 h-36 rounded-lg"
            />
            :
            <p>{value ? value : 'Not provided'}</p>
        }
    </div>
  )
}

export default AccountInfo