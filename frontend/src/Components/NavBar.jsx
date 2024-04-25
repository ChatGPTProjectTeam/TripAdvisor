import React, {useEffect, useState} from 'react'
import styles from '../NavBar.module.css';
import {TEDropdown, TEDropdownItem, TEDropdownMenu, TEDropdownToggle} from "tw-elements-react";

function Navbar() {
  // Adding the state for active class
  const [isActive, setIsActive] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const ArrowUp = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24">
        <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"/>
      </svg>
  );

  // Inline SVG for Arrow Down
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
        setIsActive(false);  // Set isActive to false if the screen is wider than 500px
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const descriptionInfo = "this is the guideline for this application";

  return (
      <header>
          <nav className={`${styles.navbar}`}>
              <div className={`${styles.logo}`}>
                  <a href="/frontend/public">
                      <img src="/logo.svg" alt="Logo" width="100px" height="40px"/>
                  </a>
              </div>
              <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`} onClick={toggleActiveClass}>
                  <span className={`${styles.bar}`}></span>
                  <span className={`${styles.bar}`}></span>
                  <span className={`${styles.bar}`}></span>
              </div>
              <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
                  <li>
                      <TEDropdown className={`${styles.guideButton}`}>
                          <TEDropdownToggle onClick={toggleDescription} style={{backgroundColor: 'transparent', color: 'black'}}>
                              사용자 가이드
                              {showDescription ? <ArrowUp/> : <ArrowDown/>}
                          </TEDropdownToggle>
                          <TEDropdownMenu>
                              <div>
                                  <TEDropdownItem >
                                      <div>
                                          {descriptionInfo}
                                      </div>
                                  </TEDropdownItem>
                              </div>
                          </TEDropdownMenu>
                      </TEDropdown>
                      <div className={`${styles.descriptionBurgerBox} ${isActive ? styles.show : styles.hide}`}>
                          <div style={{color:'black'}}>
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
