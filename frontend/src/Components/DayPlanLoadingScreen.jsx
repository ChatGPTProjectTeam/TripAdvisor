import React, {useEffect, useState} from 'react';
import styles from './DayPlanLoadingScreen.module.css'
import Plane from "./Plane.jsx";
const LoadingScreen = () => {

  const [fadeIn, setFadeIn] = useState(true);
  const [statements, setStatements] = useState([
      '일정 수정중입니다..',
    // '초밥 먹고 오늘 길입니다..',
    // '집에 가고 싶습니다..',
    // '배고픕니다..',
    //   '일본 가본적이 없습니다..',
    //   '졸업하고 싶습니다..',
    //   '정말 열심히 일정 수정중입니다..',
    //   '보낸 메시지 보고 볼라는 중입니다..',
    //   '뇌절중입니다..',
    //   '조금만 더 기다려주세요..'

  ]);
  const [currentStatementIndex, setCurrentStatementIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(false);
      const nextIndex = (currentStatementIndex + 1) % statements.length;
      setCurrentStatementIndex(nextIndex);
      setFadeIn(true);
    }, 2000); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, [currentStatementIndex, statements]);

  const RotatedSVG = () => {
  return (
      // <svg
      //     xmlns="http://www.w3.org/2000/svg"
      //     width="60"
      //     height="60"
      //     viewBox="0 0 24 24"
      //     style={{fill: 'rgba(0, 0, 0, 1)', transform: 'rotate(90deg)'}}
      // >
      //   <path
      //       d="M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.81V18l-3 2v2l5-2 5 2v-2l-3-2v-4.685l8 2.895z"></path>
      // </svg>
      <div><img src="/sushiOne.svg" alt="Logo" width="80px" height="80px"/></div>

  );
  };
  return (
      <div style={{flex: 4}}>
        <div className={styles['loading-main-container']}>
          <div className={styles['loading-main']}>

            <div>

            </div>
            <div><RotatedSVG/></div>
            <span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
            <h1>{statements[currentStatementIndex]}</h1>
          </div>
        </div>

      </div>
  );
};

export default LoadingScreen;