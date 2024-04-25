import useFetch from "./hooks/loadData.jsx";
import React, {useEffect, useState} from 'react'
import styles from './Sidebar.module.css'
import './App.css'
import chatData from './frontDB/chatLog.json';



export function ChatCreateButton() {
    const [chats, setChats] = useState(chatData.chats);

    function chatClick() {
        const newChat = {
            id: chats.length + 1,
            title: "Unknown",
            isOpen: false
        };
        console.log(newChat);
        setChats(prevChats => [...prevChats, newChat]);
        console.log("new data is added");
    }

    return (
        <div style={{ display: 'flex' }} className={`${styles.sidebarNewChatBox}`}>
            <button onClick={chatClick} className={`button-64 ${styles.sidebarButton}`}>
                <span className="text">New Chat</span>
            </button>
        </div>
    );
}


export function ChatButton({title, isOpen}) {
    const handleChatLoad = () => {
        console.log("Loading chat...");
    }
    return (
        <div style={{display: 'flex'}} className={`${styles.sidebarChatBox}`}>
            <button onClick={handleChatLoad} className={`button-80 ${styles.sidebarLoadButton}`}>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px'}}>
                    <span className="text">
                    Target: {title}
                    </span>
                    <span>
                        ??시간
                    </span>
                </div>
                <div style={{color: '#ffffff', fontSize: '16px'}}>새 여행코스</div>
            </button>

        </div>
    );
}
