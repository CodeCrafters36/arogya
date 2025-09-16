import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './LoginSignup/Signup.jsx'
import Home from './Home.jsx'
import Login from './LoginSignup/Login.jsx'
import MentalHealthScreener from './Screening/MentalHealthScreener.jsx'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/screening" element={<MentalHealthScreener />} />
      </Routes>
    </div>
  )
}

export default App
