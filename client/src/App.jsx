import './App.css'
import { Header } from './components/Header'
import { Login } from './components/Login'
import { Register } from './components/Register'

function App(){
  return (
    <>
      <Header/>
      <Register/>
      <Login/>
    </>
  )
}

export default App