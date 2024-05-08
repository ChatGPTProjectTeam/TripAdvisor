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

    return (
        <div>
            <div className='title-container'><p>{flightInfo} 정보</p></div>
            <div className='flight-info-container'>
                <div style={{fontSize: '12px'}}>
                    <p>{plane_info.origin}</p>
                    <p>{plane_info.departure}</p>
                </div>
                <div style={{minWidth:'300px'}}><Plane/></div>
                <div style={{fontSize: '12px'}}>
                    <p>{plane_info.destination}</p>
                    <p>{plane_info.arrival}</p>
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
