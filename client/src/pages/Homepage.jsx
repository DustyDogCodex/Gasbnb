import { NavBar } from "../components/NavBar"
import { UserContext } from '../UserContext'
import { useContext } from 'react'

function Homepage() {
  //using context to check for logged in user
  const { userInfo } = useContext(UserContext)
  console.log(userInfo)

  return (
    <>
        <NavBar/>
    </>
  )
}

export default Homepage