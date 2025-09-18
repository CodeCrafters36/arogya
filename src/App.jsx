
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './LoginSignup/Signup.jsx'
import Home from './Home.jsx'
import Login from './LoginSignup/Login.jsx'
import Emergency from './Emergency/Emergency.jsx'
import EmergencyForm from './Emergency/EmergencyForm.jsx'
import Expert from './Expert/expert.jsx'
import Gamezone from './Gamezone/Gamezone.jsx'
import Audio from './Resources/audio.jsx'
import ArticlesComponent from './Resources/articles.jsx'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/emergency" element={<Emergency/>} />
        <Route path="/emergencyForm" element={<EmergencyForm/>} />
         <Route path="/expert" element={<Expert/>}/>
         <Route path='/gamezone' element={<Gamezone/>}/>
         <Route path='/audio' element={<Audio/>}/>
         <Route path='/article' element={<ArticlesComponent/>}/>
      </Routes>
    </div>
  )
}

export default App
