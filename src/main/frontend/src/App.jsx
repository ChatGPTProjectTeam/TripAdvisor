import { useState } from 'react'
import reactLogo from './assets/react.svg'
import tripperLogo from '/logo.png'
import './App.css'
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import './Sidebar.css'

function App() {
    const [count, setCount] = useState(0)
    const [isOpen, setIsOpen] = useState(false);
    const toggleActiveClass = () => {
        setIsOpen(!isOpen);
    };
    const removeOpen = () => {
        setIsOpen(false)
    }
  return (
      <div className="App-main">
          <Navbar/>
          <div className="mainContent">
              <div style={{flex: '0.5'}}>
                  <Sidebar/>
              </div>
              <div style={{flex: '1.5'}}>
                  <div>
                      <a href="" target="_blank">
                          <img src={tripperLogo} className="logo" alt="Vite logo"/>
                      </a>

                  </div>
                  <h1>Tripper</h1>
                  <div className="card">

                  </div>
                  <p className="read-the-docs">
                      ====== THIS IS DEMO VERSION ======
                  </p>
              </div>

          </div>


      </div>
  )
}

export default App
