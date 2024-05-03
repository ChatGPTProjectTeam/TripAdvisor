import React from 'react';


const DayPlan = ({ component }) => {
    // Check if the component is of type '일정' before rendering
    if (component.componentType !== '일정') {
        return null;
    }

    const { day_plan_list } = component;

    return (
        <div>
            <div className='title-container'><p>일정</p></div>
            {day_plan_list.map(dayPlan => (
                <div key={dayPlan.planId}>
                    <p>Plan ID: {dayPlan.planId}</p>
                    <div className='day-plan-container'>
                        <div className='day-plan-category'><p>{dayPlan.date}</p></div>
                        <div>
                            <p className='day-plan-category'>오전</p>
                            <p>{dayPlan.morning.activity}</p>
                            <p className='day-plan-category'>오후</p>
                            <p>Afternoon: {dayPlan.afternoon.activity}</p>
                            <p className='day-plan-category'>저녁</p>
                            <p>Evening: {dayPlan.evening.activity}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DayPlan;
