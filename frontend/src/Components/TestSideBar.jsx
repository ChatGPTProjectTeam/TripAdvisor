import { useState, useEffect, useRef } from "react";
import ChatList from "./ChatList.jsx";
import ChatCreateButton from "./ChatButton.jsx";
import formStyles from './TripForm.module.css';
import { Link, useNavigate, useLocation } from "react-router-dom";


import styles from '../Sidebar.module.css';
import logoStyle from '../NavBar.module.css';
import PopUp from "./PopUp.jsx";
import GuideLinePopUp from "./GuideLinePopUp.jsx";

const [minWidth, maxWidth, defaultWidth] = [200, 500, 350];

export default function Sidebar() {
    const [width, setWidth] = useState(defaultWidth);
    const isResized = useRef(false);
    const provinceOptions = ["간사이", "간토", "오키나와"];
    const [selectedProvince, setSelectedProvince] = useState([]);
    const navigate = useNavigate(); // useNavigate 초기화
    const location = useLocation(); // useLocation 초기화


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
            <div style={{ width: `${width / 16 <= 23 ? 23 : width / 16}rem` }} className="bg-gray-50">

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
                    <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                        필터하고 싶은 지역을 선택해주세요
                    </div>
                    <div className="input_area">
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                {provinceOptions.map((option, index) => (
                                    <div key={index} style={{paddingLeft: '10px'}}
                                         className={`${formStyles["checkbox-wrapper-47"]} ${formStyles["province-sidebar-box"]}`}>
                                        <input
                                            type="checkbox"
                                            id={`province-sidebar-${index}`}
                                            checked={selectedProvince.includes(option)}
                                            onChange={() => handleProvinceSelection(option)}
                                        />
                                        <label htmlFor={`province-sidebar-${index}`}>{option}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
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

    function handleProvinceSelection(option) {
        setSelectedProvince(prevCategory => {
            const newProvince = prevCategory.includes(option)
                ? prevCategory.filter(category => category !== option)
                : [...prevCategory, option];

            // query parameter 업데이트
            const queryParams = new URLSearchParams(location.search);
            if (newProvince.length > 0) {
                queryParams.set("province", newProvince.join(","));
            } else {
                queryParams.delete("province");
            }
            navigate(`?${queryParams.toString()}`);

            return newProvince;
        });
    }
}
