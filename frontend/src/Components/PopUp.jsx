import React, {useEffect, useState} from "react";
import styles from "./PopUp.module.css";
import {Link} from "react-router-dom";

export default function PopUp({ children, buttonText = "지도 보기" }) {
    const [modal, setModal] = useState(false);
    const [fade, setFade] = useState(false);

    const toggleModal = () => {
        if (modal) {
            setFade(true);
            setTimeout(() => {
                setModal(false);
                setFade(false);
                document.body.classList.remove(styles.activePopUp);
            }, 500); // Match the duration of the fade-out animation
        } else {
            setModal(true);
            document.body.classList.add(styles.activePopUp);
        }
    };

    return (
        <div>
            <button onClick={toggleModal} className={`${styles.modalButton}`}>
                {buttonText}
            </button>

            {modal && (
                <div className={styles.modal}>
                    <div className={`${styles.overlay} ${fade ? styles.fadeOut : ""}`} onClick={toggleModal}></div>
                    <div className={`${styles.modalContent} ${fade ? styles.fadeOut : ""}`}>
                        {children}
                        <button style={{marginTop: '10px'}} className={styles.modalButton} onClick={toggleModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export function InternalPopUp({ children, buttonText = "지도 보기", targetId }) {
    const [modal, setModal] = useState(false);
    const [fade, setFade] = useState(false);
    // console.log("targeto:",targetId);

    const toggleModal = () => {
        if (modal) {
            setFade(true);
            setTimeout(() => {
                setModal(false);
                setFade(false);
                document.body.classList.remove(styles.activePopUp);
            }, 500); // Match the duration of the fade-out animation
        } else {
            setModal(true);
            document.body.classList.add(styles.activePopUp);
        }
    };

    return (
        <div>

            <Link to={`/info/${targetId}`} onClick={toggleModal} className={`${styles.modalButton}`}>
                {buttonText}
            </Link>
            {/*<button onClick={toggleModal} className={`${styles.modalButton}`}>*/}
            {/*    {buttonText}*/}
            {/*</button>*/}
            {modal && (
                <div className={styles.modal}>
                    <div className={`${styles.overlay} ${fade ? styles.fadeOut : ""}`} onClick={toggleModal}></div>
                    <div className={`${styles.modalContent} ${fade ? styles.fadeOut : ""}`}>
                        {children}
                        <Link to="/chat/${targetId}" style={{marginTop: '10px'}} className={styles.modalButton} onClick={toggleModal}>
                            Close
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

