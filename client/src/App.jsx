import './App.css'
import { Header } from './components/Header'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { UserContext } from './UserContext'
import { useContext } from 'react'

function App(){
  //using context to check for logged in user
  const { userInfo } = useContext(UserContext)

  return (
    <>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Login/>}
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