import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from "./NavBar.jsx";
import SideBar from "./SideBar.jsx";
import Maincontents from "./MainContent.jsx";

function App() {
  return (
      <div>
          <div>
              <NavBar />
          </div>
          <div style={{display: "flex"}}>
              <SideBar/>
              <Maincontents/>
          </div>
      </div>
  )
}

export default App
