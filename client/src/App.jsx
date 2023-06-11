import './App.css'
import { Header } from './components/Header'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App(){
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