import React from 'react';

const AccommodationPlan = ({ component, courseId }) => {
    // Check if the component is of type '항공편' before rendering
    if (component.componentType !== '숙소') {
        return null;
    }

    // const { day_plan_list } = component;

    return (
        <div>
            <p>Price: {accommodationInfo.name}</p>
            <p>Origin: {accommodationInfo.stars}</p>
            <p>Destination: {accommodationInfo.lowest_price}</p>
            <p>Departure: {accommodationInfo.rating}</p>
            <p>Arrival: {accommodationInfo.location}</p>
        </div>
    );
};

export default AccommodationPlan;