function AccountInfo({ info, value }) {
  return (
    <div 
        className="flex flex-col items-start justify-center border-b-2 py-5 px-10 w-full"
    >
        <p className="font-semibold">{info}</p>
        <p>{value ? value : 'Not provided'}</p>
    </div>
  )
}

export default AccountInfo