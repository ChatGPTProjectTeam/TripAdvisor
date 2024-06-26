import useFetch from "../hooks/loadData.jsx";
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../Sidebar.module.css'
import '../App.css'
import chatData from '../frontDB/chatLog.json';
import {CreateForm} from "./CreateForm.jsx";



export default function ChatCreateButton() {
    // const [chats, setChats] = useState(chatData.chats);
    const navigate = useNavigate();
    function handleCreateChat() {
        navigate('/create_form');
    }

    return (
        <div style={{display: 'flex',color:'#c4b5fd'}} className={`${styles.sidebarNewChatBox}`}>
            <button onClick={handleCreateChat} style={{color:'#c4b5fd'}} className={`button-64 ${styles.sidebarButton}`}>
                <span className="text">일정 추가</span>
            </button>
        </div>
    );
}

export function ChatIntroCreateButton() {
    // const [chats, setChats] = useState(chatData.chats);
    const navigate = useNavigate();
    function handleCreateChat() {
        navigate('/create_form');
    }

    return (
        <div style={{display: 'flex'}}>
            <button onClick={handleCreateChat}  style={{color:'#c4b5fd'}} className={`button-64 ${styles.sidebarButton}`}>
                <span className="text">일정 추가</span>
            </button>
        </div>
    );
}


