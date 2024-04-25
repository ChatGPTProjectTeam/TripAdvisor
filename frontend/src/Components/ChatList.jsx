import dummy from '../frontDB/chatLog.json'
import React, {useEffect, useState} from "react";
import {ChatButton} from "./ChatButton.jsx";
import styles from "../Sidebar.module.css";
import {Link} from "react-router-dom";

export default function ChatList() {
    console.log(dummy);
    const [chats, setChats] = useState([]);
    const handleChatLoad = (id) => {
        console.log("Loading chat...");
    }
    useEffect(() => {
        // getting data from server?
        setChats(dummy.chats);
    }, []);
    return (
        <ul>
            {chats.map(chat => (
                <li key={chat.id}>
                    {/*<ChatButton title={chat.title}/>*/}
                    <div style={{display: 'flex'}} className={`${styles.sidebarChatBox}`}>
                        <button onClick={handleChatLoad} className={`button-80 ${styles.sidebarLoadButton}`}>
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px'}}>
                                <span className="text">Target: {chat.title}</span>
                                <span>??시간</span>
                            </div>
                            <div style={{color: '#ffffff', fontSize: '16px'}}>새 여행코스</div>
                        </button>
                    </div>

                </li>
            ))}
        </ul>
    );
}