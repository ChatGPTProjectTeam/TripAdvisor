import React from 'react';

const FlightPlan = ({ component, courseId }) => {
    // Check if the component is of type '항공편' before rendering
    if (component.componentType !== '항공편') {
        return null;
    }

    const { PlaneInfo } = component;

    return (
        <div>
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
