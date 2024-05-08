import React, {useState} from 'react';
import styles from './IntroPage.module.css';
import ChatCreateButton from "./ChatButton.jsx";
import chatData from "../frontDB/chatLog.json";
import {useNavigate} from "react-router-dom";

function IntroPage() {





const ChatCreateButton = () => { // Use '=' instead of '=>' for function declaration
    // const [chats, setChats] = useState(chatData.chats);
    const navigate = useNavigate();
    function handleCreateChat() {
        navigate('/create_form');
    }

    return (
        <div style={{display: 'flex'}}>
          <button onClick={handleCreateChat} className={`button-64 ${styles.sidebarButton}`}>
            <span className="text">가고 싶어</span>
          </button>
        </div>
    );
}


  return (
    <div style={{ flex: '4', position: 'relative' }}>
      <div className={styles['canvas-container']} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      </div>
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        <h1 style={{ color: 'white' }}>일본가고 싶니?</h1>
        <div style={{display:'flex', justifyContent:'center', marginTop:'80px'}}>
          <ChatCreateButton/>
        </div>
      </div>
    </div>
  );
}

export default IntroPage;
