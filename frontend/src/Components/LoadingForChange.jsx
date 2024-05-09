import React, {useEffect, useRef, useState} from 'react';
import styles from './LoadingForChange.module.css';

const LoadingChangeScreen = () => {



  return (

      <div>
          <div>일정 수정중입니다..</div>
          <div className={styles.mainContainer}></div>
      </div>


  );
}

export default LoadingChangeScreen;
