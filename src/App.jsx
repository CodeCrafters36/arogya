


import React, { useState } from 'react'


import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Signup from './LoginSignup/Signup.jsx'
import Home from './Home.jsx'
import Login from './LoginSignup/Login.jsx'
import Emergency from './Emergency/Emergency.jsx'
import EmergencyForm from './Emergency/EmergencyForm.jsx'
import Expert from '../src/Expert/Expert.jsx'
import Gamezone from './Gamezone/Gamezone.jsx'
import Audio from './Resources/Audio.jsx'
import ArticlesComponent from './Resources/Articles.jsx'

import IntroductionPage from './Mainpages/IntroductionPage.jsx'

import TestPage from './Mainpages/TestPage.jsx'

import MentalHealthScreener from './Screening/MentalHealthScreener.jsx'
import Dashboard from './Mainpages/Dashboard.jsx'
import Profile from './Mainpages/Profile.jsx'
import Planner from './Mainpages/Planner.jsx'
import Chatbot from './Mainpages/Chatbot.jsx'
import Bubblepop from './Games/Bubblepop.jsx'
import Game2048 from './Games/Game2048.jsx' 
import NavbarAfterLogin from './Mainpages/NavbarAfterLogin.jsx'
import NavbarBeforeLogin from './Mainpages/NavbarBeforeLogin.jsx'

import MainDashboard from './MainDashboard/MainDashboard.jsx'
import SelfHelpBooks from './ResourceLibrary/SelfHelpBooks.jsx'
import BasePage from './ResourceLibrary/BasePage.jsx'
import PeerSupport from './PeerSupport/PeerSupport.jsx'

import Layout from './Layout/Layout.jsx'

import Videos from './ResourceLibrary/Videos.jsx'

import CollegeDashboard from './Admin/CollegeDashboard.jsx'
import StudentListPage from './Admin/StudentListPage.jsx'
import ChatPage from './Admin/ChatPage.jsx'


import Colorsplash from './Games/Colorsplash.jsx'

// import GoogleTranslate from './Translate/GoogleTranslate.jsx'

function App() {
   const [user,setUser] = useState("");
  //  const location = useLocation(); 
  //    const beforeLoginPages = ['/', '/login', '/signup'];
  //        const isBeforeLoginPage = beforeLoginPages.includes(location.pathname);
  return (
    <div>
             {/* <GoogleTranslate /> */}

         {/* {isBeforeLoginPage ? <NavbarBeforeLogin /> : <NavbarAfterLogin />} */}
      <Chatbot/>
      <Routes>
       
       
        <Route path="/emergency" element={<Emergency/>} />
        <Route path="/emergencyForm" element={<EmergencyForm/>} />
         <Route path="/expert" element={<Expert/>}/>
         <Route path='/gamezone' element={<Gamezone/>}/>
         <Route path='/audio' element={<Audio/>}/>
         <Route path='/article' element={<ArticlesComponent/>}/>


        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login  user={user} setUser={setUser} />} />
        <Route path="/" element={<IntroductionPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/screening" element={<MentalHealthScreener />} />
        <Route path="/games/bubble-pop" element={<Bubblepop />} />
        <Route path="/games/2048-mindful" element={<Game2048 />} />
        {/* <Route path="/chatbot" element={<Chatbot />} /> */}
        <Route path="/peersupport" element={<PeerSupport />} />
        <Route path="/maindashboard" element={<MainDashboard />} />
        <Route path="/selfhelpbooks" element={<SelfHelpBooks />} />
        <Route path="/basepage" element={<BasePage />} />
        <Route path="/layout" element={<Layout />} />

        <Route path="/videos" element={<Videos />} />
        <Route path="/college" element={<CollegeDashboard />} />
        <Route path="/students" element={<StudentListPage />} />
        <Route path="/chat" element={<ChatPage/>} />

        <Route path="/videos" element={<Videos />} /> 
         <Route path="/games/colorsplash" element={<Colorsplash />} />


      </Routes>
    </div>
  )
}

export default App
