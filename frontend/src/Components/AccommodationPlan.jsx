import React from 'react';
import './PlanFormat.css';

const AccommodationPlan = ({ component, courseId }) => {
    // Check if the component is of type '항공편' before rendering
    if (component.componentType !== '숙소') {
        return null;
    }

    const { accommodationInfo } = component;

    return (
        <div>
            <div>
                <div className='title-container'><p>숙소 정보</p></div>
                <p className='place-name'>{accommodationInfo.name}</p>
                <p className='place-location'>Rating: {accommodationInfo.rating}</p>
                <p className='place-location'>Location: {accommodationInfo.location}</p>
            </div>

        </div>
    );
};

export default AccommodationPlan;