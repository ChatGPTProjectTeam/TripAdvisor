import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from "./Components/NavBar.jsx";
import SideBar from "./Components/SideBar.jsx";
import Maincontents from "./Components/MainContent.jsx";
import IntroPage from "./Components/IntroPage.jsx";
import EmptyPage from "./Components/EmptyPage.jsx";
import {CreateChat} from "./Components/CreateChat.jsx"

import { BrowserRouter, Route , Routes } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
          <div>
              <div><NavBar/></div>
              <div style={{display: "flex"}}>
                  <SideBar/>
                  <Routes>
                    <Route path="/" element={<IntroPage/>} />
                    <Route path="/chat/:id" element={<Maincontents/>} />
                      <Route path="/create_chat" element={<CreateChat/>} />
                    <Route path="*" element={<EmptyPage/>} />
                  </Routes>
              </div>
          </div>
      </BrowserRouter>

  )
}

export default App
