import { Route, Routes } from 'react-router-dom'
import Signup from '../components/sign'
import Auth from '../components/auth'
import Login from '../components/login'
import Tasks from '../components/tasks'

function Home() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/tasks' element={<Tasks />} />
      </Routes>
    </>
  )
}

export default Home
