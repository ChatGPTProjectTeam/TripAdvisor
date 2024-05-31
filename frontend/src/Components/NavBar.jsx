import React, { useEffect, useState } from 'react';
import styles from '../NavBar.module.css';
import { TEDropdown, TEDropdownItem, TEDropdownMenu, TEDropdownToggle } from "tw-elements-react";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';


function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const descriptionInfo = `
# 데모용 사용자 가이드입니다.


1. skyscanner 졍책상 지난 날짜의 항공편 일정과 숙박 일정은 조회가 되지 않습니다.
2. 10일 이상의 여행은 추천하지 않습니다.
3. 일정 생성 시에는, 대화형 프롬프트가 제공되지 않고 기본적인 코스 생성 이후에 수정하는 부분에서 프롬프트가 제공됩니다.




`;

  const ArrowUp = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24">
      <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"/>
    </svg>
  );

  const ArrowDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24">
      <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"/>
    </svg>
  );

  const toggleDescription = (e) => {
    e.stopPropagation();
    setShowDescription(!showDescription);
  };

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 500) {
        setIsActive(false);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header style={{ position: 'fixed', width: '100%', top: 0, zIndex: 1000 }}>
      <nav className={`${styles.navbar}`}>
        <div style={{width:'100%'}} className={`${styles.logo}`}>
          {   <Link to="/">
            <img src="/logo.svg" alt="Logo" width="100px" height="40px"/>
          </Link>   }
        </div>
        <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`} onClick={toggleActiveClass}>
          <span className={`${styles.bar}`}></span>
          <span className={`${styles.bar}`}></span>
          <span className={`${styles.bar}`}></span>
        </div>
        <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
          <li>
            <TEDropdown className={`${styles.guideButton}`}>
              <TEDropdownToggle onClick={toggleDescription} style={{ backgroundColor: 'transparent', color: 'black' }}>
                사용자 가이드
                {showDescription ? <ArrowUp/> : <ArrowDown/>}
              </TEDropdownToggle>
              <TEDropdownMenu>
                <div>
                  <TEDropdownItem>
                    <div className={`${styles.blurBackground}`}>
                      <div style={{fontSize:'12px', color:'black'}}>
                        <ReactMarkdown>{descriptionInfo}</ReactMarkdown>
                      </div>
                    </div>
                  </TEDropdownItem>
                </div>
              </TEDropdownMenu>
            </TEDropdown>
            <div className={`${styles.descriptionBurgerBox} ${isActive ? styles.show : styles.hide}`}>
              <div style={{ color: 'black' }}>
                <h2>서비스 가이드라인</h2>
                <h3>{descriptionInfo}</h3>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
