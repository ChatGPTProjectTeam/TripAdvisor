import React, { useEffect, useState } from 'react';
import styles from './IntroPage.module.css';
import ChatCreateButton from "./ChatButton.jsx";
import { useNavigate } from "react-router-dom";
import {ChatIntroCreateButton} from "./ChatButton.jsx"


function IntroPage() {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    setFadeIn(true);
  }, []);

  function handleCreateChat() {
    navigate('/create_form');
  }

  return (
    <div className="bg-grey-300 h-full" style={{ position: 'relative' }}>
      <div className={`${styles.introContainer} ${fadeIn ? styles.fadeIn : ''}`}>
        <h1 style={{color: 'white', fontSize:'40px'}}>일본가고 싶니?</h1>
        <div style={{textAlign:'-webkit-center'}}>
          <img src="/introImage.svg" alt="Logo" width="200px" height="200px"/>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '80px'}}>
          <ChatIntroCreateButton/>
        </div>
      </div>
    </div>
  );
}

export default IntroPage;
