import React, {useEffect, useState} from 'react'
import styles from './Sidebar.module.css'
import './App.css'

export function ChatCreateButton() {
    const handleNewChat = () => {
    console.log("Creating a new chat...");

    // Add logic to create a new chat
    };
    return (
        <div style={{display: 'flex'}} className={`${styles.sidebarNewChatBox}`}>
            <button onClick={handleNewChat} className={`button-64 ${styles.sidebarButton}`}>
                <span className="text">New Chat</span>
            </button>
        </div>
    );
}
export function ChatButton( {title, isOpen} ) {
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
