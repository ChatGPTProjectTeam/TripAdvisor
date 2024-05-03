import React from 'react';


const DayPlan = ({ component }) => {
    // Check if the component is of type '일정' before rendering
    if (component.componentType !== '일정') {
        return null;
    }

    const { day_plan_list } = component;

    return (
        <div>
            {day_plan_list.map(dayPlan => (
                <div key={dayPlan.planId}>
                    <p>Plan ID: {dayPlan.planId}</p>
                    <p>Date: {dayPlan.date}</p>
                    <p>Morning: {dayPlan.morning.activity}</p>
                    <p>Afternoon: {dayPlan.afternoon.activity}</p>
                    <p>Evening: {dayPlan.evening.activity}</p>
                </div>
            ))}
        </div>
    );
};

export default DayPlan;
