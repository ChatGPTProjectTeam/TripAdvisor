import React, {useEffect, useState} from 'react'
import styles from '../Sidebar.module.css'
import logoStyle from '../NavBar.module.css'
import '../App.css'
import ChatList from "./ChatList.jsx";
import './ChatButton.jsx'
import ChatCreateButton from "./ChatButton.jsx";
import NavBar from "./NavBar.jsx";
import {Link} from "react-router-dom";

function Sidebar() {
    return(
        <div style={{flex: 1}} className={`${styles.sidebar}`}>
            <div style={{display: 'flex', flexDirection: 'column', width: '100%', minHeight: '1080'}}>
                <div style={{scale:'1.3', height: '100%'}} className={`${logoStyle.logo}`}>
                    {<Link to="/">
                        <img src="/logo.svg" alt="Logo" width="100px" height="40px"/>
                    </Link>}
                </div>
                <ChatCreateButton/>
                <ChatList/>
            </div>
        </div>
    )
}

export default Sidebar;