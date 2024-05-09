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
    <div style={{ flex: '4', position: 'relative' }}>
      <div className={`${styles.introContainer} ${fadeIn ? styles.fadeIn : ''}`}>
        <h1 style={{color: 'white'}}>일본가고 싶니?</h1>
        <img src="/introImage.svg" alt="Logo" width="200px" height="200px"/>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '80px'}}>
          <ChatIntroCreateButton/>
        </div>
      </div>
    </div>
  );
}

export default IntroPage;
