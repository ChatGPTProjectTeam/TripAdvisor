import React, { useState } from "react";
import styles from "./PopUp.module.css";


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

export function FestivalPopUp({ children, buttonText = "지도 보기" }) {
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

