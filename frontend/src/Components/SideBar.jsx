import React, {useEffect, useState} from 'react'
import styles from '../Sidebar.module.css'
import '../App.css'
import dummy from '../frontDB/chatLog.json'
import ChatList from "./ChatList.jsx";
import './ChatButton.jsx'
import {ChatCreateButton} from "./ChatButton.jsx";

function Sidebar() {

    return(
        <div style={{flex: 1}} className={`${styles.sidebar}`}>
            <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <ChatCreateButton/>
                <ChatList/>
            </div>
        </div>
    )
}

export default Sidebar;