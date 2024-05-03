import React from 'react';
import './PlanFormat.css'; // Import CSS file for styling

const Plane = () => {
  return (
    <div className="moving-svg-container">
        <svg
            className='moving-svg'
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="-15 0 8 25"
            style={{fill: "rgba(255, 255, 255, 255)"}}
        >
            <path
                d="M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.81V18l-3 2v2l5-2 5 2v-2l-3-2v-4.685l8 2.895z"
                transform="rotate(90)"
            ></path>
        </svg>


    </div>
  );
};

export default Plane;
