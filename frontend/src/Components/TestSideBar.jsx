import { useState, useEffect, useRef } from "react";
import ChatList from "./ChatList.jsx";
import ChatCreateButton from "./ChatButton.jsx";
import { Link } from "react-router-dom";

import styles from '../Sidebar.module.css';
import logoStyle from '../NavBar.module.css';

const [minWidth, maxWidth, defaultWidth] = [200, 500, 350];

export default function Sidebar() {
    const [width, setWidth] = useState(defaultWidth);
    const isResized = useRef(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResized.current) {
                return;
            }

            setWidth((previousWidth) => {
                const newWidth = previousWidth + e.movementX / 2;

                const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;

                return isWidthInRange ? newWidth : previousWidth;
            });
        };

        const handleMouseUp = () => {
            isResized.current = false;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    return (
        <div className="flex">
            <div style={{ width: `${width / 16}rem` }} className="bg-neutral-700">
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '1080px' }}>
                    <div style={{ scale:'1.3',display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                        <Link to="/" style={{ display: 'block' }}>
                            <img src="/logo.svg" alt="Logo" style={{ width: '100px', height: 'auto' }} />
                        </Link>
                    </div>
                    <ChatCreateButton />
                    <ChatList />
                </div>
            </div>

            {/* Handle */}
            <div
                className="w-2 cursor-col-resize"
                onMouseDown={() => {
                    isResized.current = true;
                }}
            />
        </div>
    );
}


// import React, {useEffect, useState} from 'react'
// import styles from '../Sidebar.module.css'
// import logoStyle from '../NavBar.module.css'
// import '../App.css'
// import ChatList from "./ChatList.jsx";
// import './ChatButton.jsx'
// import ChatCreateButton from "./ChatButton.jsx";
// import NavBar from "./NavBar.jsx";
// import {Link} from "react-router-dom";
//
// function Sidebar() {
//     const [width, setWidth] = useState(450);
//     return(
//         <div style={{flex: 1}} className={`${styles.sidebar}`}>
//             <div style={{display: 'flex', flexDirection: 'column', width: '100%', minHeight: '1080'}}>
//                 <div style={{scale:'1.3', height: '100%'}} className={`${logoStyle.logo}`}>
//                     {<Link to="/">
//                         <img src="/logo.svg" alt="Logo" width="100px" height="40px"/>
//                     </Link>}
//                 </div>
//                 <ChatCreateButton/>
//                 <ChatList/>
//             </div>
//         </div>
//     )
// }
//
// export default Sidebar;