import React, { useEffect, useState } from 'react';
import styles from './DayPlanLoadingScreen.module.css';

const LoadingScreen = () => {
  const [fadeIn, setFadeIn] = useState(true);
  const [statements, setStatements] = useState([
    '수정중입니다..',
    // '초밥 먹고 오늘 길입니다..',
    // '집에 가고 싶습니다..',
    // '배고픕니다..',
    // '일본 가본적이 없습니다..',
    // '졸업하고 싶습니다..',
    // '정말 열심히 일정 수정중입니다..',
    // '보낸 메시지 보고 볼라는 중입니다..',
    // '뇌절중입니다..',
    // '조금만 더 기다려주세요..'
  ]);
  const [targetImages, setTargetImages] = useState([
    '/bamboo.svg',
    '/sushiTwo.svg',
    '/temple.svg',
    '/kimbob.svg',
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(false);
      const nextIndex = (currentIndex + 1) % targetImages.length;
      setCurrentIndex(nextIndex);
      setFadeIn(true);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const RotatedSVG = () => {
    return (
      <img src={targetImages[currentIndex]} alt="Loading Image" width="80px" height="80px" />
    );
  };

  return (
    <div style={{ flex: 4 }}>
      <div className={styles['loading-main-container']}>
        <div className={styles['loading-main']}>
          <div>
            <RotatedSVG />
          </div>
          <span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
          <h1 style={{paddingLeft:'16px'}}>{statements[0]}</h1>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
