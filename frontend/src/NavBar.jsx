import {useEffect, useState} from 'react'
import styles from './NavBar.module.css';
function Navbar() {
  // Adding the state for active class
  const [isActive, setIsActive] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  // Function to toggle active class
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  // Function to remove active class
  const removeActive = () => {
    setIsActive(false)
  }
  const toggleDescription = (e) => {
    e.stopPropagation(); // Stop event propagation
    setShowDescription(!showDescription);
  };

  const ArrowUp = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"/>
      </svg>
  );

  // Inline SVG for Arrow Down
  const ArrowDown = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"/>
      </svg>
  );
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDescription && !event.target.closest(`.${styles.navLink}`)) {
        setShowDescription(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDescription]);



  return (
      <header>
        <nav className={`${styles.navbar}`}>
          {/* Logo */}
          <div className={`${styles.logo}`}>
            <img src="/logo.svg" alt="Logo" width="100px" height="40px"/> {/* Adjust the path */}
          </div>

        {/* Menu */}
            <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
                <li onClick={removeActive}>
                    <button className={`${styles.navLink} ${showDescription ? 'active' : ''}`}
                            onClick={toggleDescription}>
                        사용자 가이드
                        {showDescription ? <ArrowUp/> : <ArrowDown/>}
                    </button>
                    <div className={`${styles.descriptionBox} ${showDescription ? 'show' : ''}`}>
                        <p style={{color: 'black'}}>
                            This is the user guide description.
                        </p>
                    </div>
                </li>
            </ul>

            {/* Hamburger Icon */}
            <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`} onClick={toggleActiveClass}>
                <span className={`${styles.bar}`}></span>
                <span className={`${styles.bar}`}></span>
                <span className={`${styles.bar}`}></span>
            </div>

        </nav>
      </header>

  );
}

export default Navbar;
