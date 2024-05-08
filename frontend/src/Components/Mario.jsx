import React from 'react';
import styles from './Mario.module.css';

const Mario = () => {
  return (
      <div style={{width:'300px', height:'400px'}}>
          <div className={styles.marioDeathAnimation}>
              <div className={styles.block}></div>
              <div className={styles.block}></div>
              <div className={styles.block}></div>
              <div className={styles.block}></div>
              <div className={styles.block}></div>
              <div className={styles.mario}></div>
              <div className={styles.goomba}></div>
          </div>
      </div>

  );
};

export default Mario;
