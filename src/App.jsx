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
import Dashboard from './Mainpages/Dashboard.jsx'
import Profile from './Mainpages/Profile.jsx'
import Planner from './Mainpages/Planner.jsx'
import Chatbot from './Mainpages/Chatbot.jsx'
import Bubblepop from './Games/Bubblepop.jsx'
import Game2048 from './Games/Game2048.jsx' 


import PeerSupport from './PeerSupport/PeerSupport.jsx'

import Layout from './Layout/Layout.jsx'

function App() {
   const [user, setUser] = useState(null);
  return (
    <div>
      <Navbar user={user}/>
      <Chatbot/>
      <Routes>

        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup  setUser={setUser}/>} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/" element={<IntroductionPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/screening" element={<MentalHealthScreener />} />
        <Route path="/bubblepop" element={<Bubblepop />} />
        <Route path="/game2048" element={<Game2048 />} />
        {/* <Route path="/chatbot" element={<Chatbot />} /> */}
        <Route path="/peersupport" element={<PeerSupport />} />
        <Route path="/layout" element={<Layout />} />
      </Routes>
    </div>
  )
}

export default App
