import './App.css'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { UserContext } from './UserContext'
import { useContext } from 'react'
import Homepage from './pages/Homepage'

function App(){
  //using context to check for logged in user
  const { userInfo } = useContext(UserContext)
  console.log(userInfo)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Homepage/>}
          />
          <Route
            path='/login'
            element={<Login/>}
          />
          <Route
            path='/register'
            element={<Register/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App