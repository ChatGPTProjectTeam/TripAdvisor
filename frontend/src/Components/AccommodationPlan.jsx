import React from 'react';
import './PlanFormat.css';

const AccommodationPlan = ({ component, targetId }) => {
    // Check if the component is of type '항공편' before rendering
    if (component.component_type !== 'accomodation_info') {
        return null;
    }

    const { accommodation_info } = component;

    return (
        <div>
            <div style={{marginBottom:'20px'}}>
                <div className='title-container'><p>숙소 정보</p></div>
                <p className='place-name'>{accommodation_info.name}</p>
                <p className='place-location'>Rating: {accommodation_info.rating}</p>
                <p className='place-location'>Location: {accommodation_info.location}</p>
            </div>

        </div>
    );
};

export default AccommodationPlan;