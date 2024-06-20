import { useState, useEffect, useRef } from "react";
import ChatList from "./ChatList.jsx";
import ChatCreateButton from "./ChatButton.jsx";
import { Link } from "react-router-dom";

import styles from '../Sidebar.module.css';
import logoStyle from '../NavBar.module.css';
import PopUp from "./PopUp.jsx";
import GuideLinePopUp from "./GuideLinePopUp.jsx";

const [minWidth, maxWidth, defaultWidth] = [200, 500, 350];

export default function Sidebar() {
    const [width, setWidth] = useState(defaultWidth);
    const isResized = useRef(false);

    const SideBarIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{ fill: 'rgba(0, 0, 0, 1)', transform: 'rotate(90deg)' }}
        >
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
        </svg>
    );
};


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
            <div style={{ width: `${width / 16}rem` }} className="bg-gray-50">
                <div className={styles.responsiveBar}>
                    <div style={{
                        scale: '1.3',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px'
                    }}>
                        <Link to="/" style={{display: 'block'}}>
                            <img src="/logo.svg" alt="Logo" style={{width: '100px', height: 'auto'}}/>
                        </Link>
                    </div>
                    <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                        <PopUp buttonText={'사용자 가이드 라인'}><GuideLinePopUp/></PopUp>
                    </div>
                    <ChatCreateButton/>
                    <ChatList/>

                </div>
            </div>

            {/* Handle */}
            <div
                className="w-4 cursor-col-resize bg-gray-100 flex justify-center items-center"
                onMouseDown={() => {
                    isResized.current = true;
                }}
            >
                <SideBarIcon />
            </div>
        </div>
    );
}
