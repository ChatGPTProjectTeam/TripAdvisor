import { useState } from 'react'
import  styles from './Navbar.module.css';

function Navbar() {
    // adding the states
    const [isActive, setIsActive] = useState(false);
    //add the active class
    const toggleActiveClass = () => {
        setIsActive(!isActive);
    };
    //clean up function to remove the active class
    const removeActive = () => {
        setIsActive(false)
    }
    return (
        <div className="App">
            <header className="App-header">
                <nav className={`${styles.navbar}`}>
                    {/* logo */}
                    <a href='#home' style={{color: '#fff'}} className={`${styles.logo}`}>TRIPPER</a>
                    <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
                        <li onClick={removeActive}>
                            <a href='#home'>사용자 가이드</a>
                        </li>
                    </ul>
                    <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`}  onClick={toggleActiveClass}>
                        <span className={`${styles.bar}`}></span>
                        <span className={`${styles.bar}`}></span>
                        <span className={`${styles.bar}`}></span>
                    </div>
                </nav>
            </header>
        </div>
    );
}
export default Navbar;