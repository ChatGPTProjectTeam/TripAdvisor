import React from 'react';
import './PlanFormat.css';

const AccommodationPlan = ({ component, targetId }) => {
    // Check if the component is of type 'accommodation_info' before rendering
    if (component.component_type !== 'accommodation_info') {
        return null;
    }

    const { accommodation_info } = component;

    // Check if any of the required data fields are blank
    const isDataBlank = (
        accommodation_info.name.trim() === '' ||
        accommodation_info.rating.trim() === '' ||
        accommodation_info.location.trim() === ''
    );

    return (
        <div>
            <div style={{marginBottom:'20px'}}>
                <div className='title-container'><p>숙소 정보</p></div>
                {/* Render accommodation information if data is not blank */}
                {!isDataBlank && (
                    <>
                        <p className='place-name'>{accommodation_info.name}</p>
                        <p className='place-location'>Rating: {accommodation_info.rating}</p>
                        <p className='place-location'>Location: {accommodation_info.location}</p>
                    </>
                )}
                {/* Conditional rendering for "Sorry!" message */}
                {isDataBlank && (
                    <div style={{marginTop:'20px', marginBottom:'20px'}}>
                        <h2>해외에서 노숙 하는 상상, 이번에 실현 해봐요!. 🥰</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccommodationPlan;
