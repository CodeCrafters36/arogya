import React from 'react'
import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './LoginSignup/Signup.jsx'
import Home from './Home.jsx'
import Login from './LoginSignup/Login.jsx'

import IntroductionPage from './Mainpages/IntroductionPage.jsx'
import Navbar from './Mainpages/Navbar.jsx'
import TestPage from './Mainpages/TestPage.jsx'

import MentalHealthScreener from './Screening/MentalHealthScreener.jsx'
import PeerSupport from './PeerSupport/PeerSupport.jsx'

function App() {
   const [user, setUser] = useState(null);
  return (
    <div>
      <Navbar user={user}/>
      <Routes>

        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup  setUser={setUser}/>} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/" element={<IntroductionPage />} />
        <Route path="/test" element={<TestPage />} />


        <Route path="/screening" element={<MentalHealthScreener />} />
        <Route path="/peersupport" element={<PeerSupport />} />

      </Routes>
    </div>
  )
}

export default App
