import React, {useEffect, useState} from 'react';
import './FlightPlan.css'

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
            <div className='flight-title-container'><p>비행기{flightInfo}정보</p></div>
            <p>Price: {PlaneInfo.price}</p>
            <p>Origin: {PlaneInfo.origin}</p>
            <p>Destination: {PlaneInfo.destination}</p>
            <p>Departure: {PlaneInfo.departure}</p>
            <p>Arrival: {PlaneInfo.arrival}</p>
            <p>Airline: {PlaneInfo.airline}</p>
        </div>
    );
};

export default FlightPlan;
