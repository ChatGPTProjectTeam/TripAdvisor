import useFetch from "../hooks/loadData.jsx";
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../Sidebar.module.css'
import '../App.css'
import chatData from '../frontDB/chatLog.json';
import {CreateChat} from "./CreateChat.jsx";

export default function ChatCreateButton() {
    const [chats, setChats] = useState(chatData.chats);
    const navigate = useNavigate();
    function handleCreateChat() {
        CreateChat().then(updatedChats => {
            console.log("New chat is added", updatedChats);
            setChats(prevChats => [...prevChats, updatedChats]);
            navigate('/');
        }).catch(error => {
            console.error("Failed to create chat", error);
        });
    }

    return (
        <div style={{display: 'flex'}} className={`${styles.sidebarNewChatBox}`}>
            <button onClick={handleCreateChat} className={`button-64 ${styles.sidebarButton}`}>
                <span className="text">New Chat</span>
            </button>
        </div>
    );
}


// export function ChatButton({title, isOpen}) {
//     const handleChatLoad = () => {
//         console.log("Loading chat...");
//     }
//     return (
//         <div style={{display: 'flex'}} className={`${styles.sidebarChatBox}`}>
//             <button onClick={handleChatLoad} className={`button-80 ${styles.sidebarLoadButton}`}>
//                 <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px'}}>
//                     <span className="text">
//                     Target: {title}
//                     </span>
//                     <span>
//                         ??시간
//                     </span>
//                 </div>
//                 <div style={{color: '#ffffff', fontSize: '16px'}}>새 여행코스</div>
//             </button>
//
//         </div>
//     );
// }
