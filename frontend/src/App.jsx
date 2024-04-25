import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from "./Components/NavBar.jsx";
import SideBar from "./Components/SideBar.jsx";
import Maincontents from "./Components/MainContent.jsx";
import { BrowserRouter, Route , Routes } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
          <div>
              <div>
                  <NavBar/>
              </div>
              <div style={{display: "flex"}}>
                  <SideBar/>
                  {/*<Route path="/chat/:id" element={<Maincontents/>} />*/}
                  <Maincontents/>
              </div>
          </div>
      </BrowserRouter>

  )
}

export default App
