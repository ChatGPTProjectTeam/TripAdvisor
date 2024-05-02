import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/loadData.jsx'; // Assuming you have a custom hook for fetching data

export default function MainPlanContents() {
    const { courseId } = useParams(); // Get the chat ID from the URL params
    const tripData = useFetch(`http://localhost:5050/PlanData`);

    // Filter the trip plan data based on the chat ID using map
    const targetPlans = tripData.filter(plan => plan.chatId === parseInt(courseId, 10)); // Rename chatId to dataId

    return (
        <div style={{flex: 4, marginTop: '40px', overflowY: "auto"}}>
            <h1>Trip Plan Details</h1>
            {targetPlans.length > 0 ? (
                targetPlans.map((targetPlan, index) => (
                    <div key={index}>
                        <h2>Trip Plan ID: {targetPlan.tripPlanId}</h2>
                        {/* Render other details of the target plan */}
                        {/* Example: Render trip plan components */}
                        {targetPlan.tripPlan.map((component, index) => (
                            <div key={index}>
                                <h3>Component {index + 1}</h3>
                                <p>Type: {component.componentType}</p>
                                {/* Render other details based on the component type */}
                                {/* Example: If componentType is '항공편', render PlaneInfo details */}
                                {component.componentType === '항공편' && (
                                    <div>
                                        <p>Price: {component.PlaneInfo.price}</p>
                                        <p>Origin: {component.PlaneInfo.origin}</p>
                                        {/* Render other PlaneInfo properties */}
                                    </div>
                                )}
                                {/* Handle other component types similarly */}
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p>No trip plan found for chat ID {courseId}</p>
            )}
        </div>
    );
}




export function MainFormContents() {
    return (
        <div style={{flex: 4, marginTop: '40px', overflowY: "auto"}}>
            <TripForm/>
        </div>
    );
}
