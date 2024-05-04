import React, {useEffect, useState} from 'react';
import './PlanFormat.css'
import Plane from "./Plane.jsx";

const FlightPlan = ({ component, courseId }) => {
    // Check if the component is of type '항공편' before rendering
    if (component.componentType !== '항공편') {
        return null;
    }
    const [flightInfo, setFlightInfo] = useState('출국');
    useEffect(() => {
        setFlightInfo((component.componentId === 1 ? '출국' : '귀국'))
    },[component.componentId])

    const { PlaneInfo } = component;

    return (
        <div>
            <div className='title-container'><p>비행기{flightInfo}정보</p></div>
            <div className='flight-info-container'>
                <div style={{fontSize: '12px'}}>
                    <p>{PlaneInfo.origin}</p>
                    <p>{PlaneInfo.departure}</p>
                </div>
                <div style={{minWidth:'300px'}}><Plane/></div>
                <div style={{fontSize: '12px'}}>
                    <p>{PlaneInfo.destination}</p>
                    <p>{PlaneInfo.arrival}</p>
                </div>
            </div>
            {/*<p>Price: {PlaneInfo.price}</p>*/}
            {/*<p>Origin: {PlaneInfo.origin}</p>*/}
            {/*<p>Arrival: {PlaneInfo.arrival}</p>*/}
            {/*<p>Airline: {PlaneInfo.airline}</p>*/}
        </div>
    );
};

export default FlightPlan;
