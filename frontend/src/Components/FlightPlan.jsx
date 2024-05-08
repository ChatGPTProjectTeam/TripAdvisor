import React, {useEffect, useState} from 'react';
import './PlanFormat.css'
import Plane from "./Plane.jsx";

const FlightPlan = ({ component, courseId, index }) => {
    // Check if the component is of type '항공편' before rendering
    if (component.component_type !== 'plane_info') {
        return null;
    }
    const [flightInfo, setFlightInfo] = useState('출국');
    useEffect(() => {
        setFlightInfo((index + 1 === 1 ? '출국' : '귀국'))
    },[component.component_id])
    const { plane_info } = component;
    const isDataBlank = (
        plane_info.origin.trim() === '' ||
        plane_info.departure.trim() === '' ||
        plane_info.destination.trim() === '' ||
        plane_info.arrival.trim() === ''
    );
    const flightInfoSection = !isDataBlank && (
        <div className='flight-info-container'>
            <div style={{ fontSize: '12px' }}>
                <p>{plane_info.origin}</p>
                <p>{plane_info.departure}</p>
            </div>
            <div style={{ minWidth: '300px' }}>
                {/* Assuming 'Plane' is a component */}
                <Plane />
            </div>
            <div style={{ fontSize: '12px' }}>
                <p>{plane_info.destination}</p>
                <p>{plane_info.arrival}</p>
            </div>
        </div>
    );

    return (
        <div>
            <div className='title-container'><p>{flightInfo} 정보</p></div>
            {/* Render flight information section only if data is not blank */}
            {flightInfoSection}
            {/* Conditional rendering for "Sorry!" message */}
            {isDataBlank && (
                <div style={{marginTop:'20px', marginBottom:'20px'}}>
                    <h2>걸어가는 것도.... 나쁘지 않을거 같아요...🙃</h2>
                </div>
            )}
        </div>
    );
};

export default FlightPlan;
