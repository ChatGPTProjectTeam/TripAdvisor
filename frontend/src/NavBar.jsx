import { useState } from 'react'
import styles from './NavBar.module.css';
function Navbar() {
  // Adding the state for active class
  const [isActive, setIsActive] = useState(false);

  // Function to toggle active class
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  // Function to remove active class
  const removeActive = () => {
    setIsActive(false)
  }

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
            <a href='#home' className={`${styles.navLink} ${styles.right}`}>사용자 가이드</a>
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
