import React, {useEffect, useState} from 'react'
import styles from './Sidebar.module.css'
import './App.css'

function Sidebar() {
    const handleNewChat = () => {
    console.log("Creating a new chat...");
    // Add logic to create a new chat
  };
    return(
        <div style={{flex: 1}} className={`${styles.sidebar}`}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div className={`${styles.sidebarNewChatBox}`}>

                    <button onClick={handleNewChat} className={`button-74 ${styles.sidebarButton}`}>
                        New Chat
                    </button>
                </div>
                <div>

                </div>
            </div>


        </div>
    )
}

export default Sidebar;