import { Header } from "../components/Header"
import { UserContext } from '../UserContext'
import { useContext } from 'react'

function Homepage() {
  //using context to check for logged in user
  const { userInfo } = useContext(UserContext)
  console.log(userInfo)

  return (
    <>
        <Header/>
    </>
  )
}

export default Homepage