import React, {useEffect, useState} from 'react';
import styles from './LoadingScreen.module.css'
import Plane from "./Plane.jsx";
const LoadingScreen = () => {

  const [fadeIn, setFadeIn] = useState(true);
  const [statements, setStatements] = useState([
      'Making trip plan in process...',
    'Making Flight plan in process...',
    'Tripping in process...',
    'Ordering Sushi in process...',
      'Learning Japanese in process...',
      'processing something...',
      'Making money for trip in process...',
      'Ordering BBQ in process...',
      'Evaluating mbti...',
      'fly eagels fly...'

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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 24 24"
      style={{ fill: 'rgba(0, 0, 0, 1)', transform: 'rotate(90deg)' }}
    >
      <path d="M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.81V18l-3 2v2l5-2 5 2v-2l-3-2v-4.685l8 2.895z"></path>
    </svg>
  );
};
  return (
      <div style={{flex: 4, marginTop: '40px', overflowY: "auto"}}>
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