import {useParams} from "react-router-dom";
import '../Sidebar.module.css'
import './TripForm.jsx'
import TripForm from "./TripForm.jsx";
import useFetch from "../hooks/loadData.jsx";
import FlightPlan from "./FlightPlan.jsx";


// this is main contents
export default function MainPlanContents() {
    const targetPlan = parseInt(useParams().id, 10);
    const tripData = useFetch(`http://localhost:5050/tripPlan`);


    return (
        <div>
            <h1>Trip Plan Details</h1>
            {tripData.TripPlan?.map((plan, index) => (
                <div key={index}>
                    <h2>Trip ID: {plan.tripPlanId}</h2>
                    {plan.tripPlan?.map((component, compIndex) => (
                        <div key={compIndex}>
                            <h3>{component.componentType}</h3>
                            {component.planeInfo && (
                                <div>
                                    <p>Flight Number: {component.planeInfo.flight_number}</p>
                                </div>
                            )}
                            {component.accommodationInfo && (
                                <div>
                                    <p>Hotel Name: {component.accommodationInfo.name}</p>
                                </div>
                            )}
                            {component.plan?.map((day, dayIndex) => (
                                <div key={dayIndex}>
                                    <h4>Date: {day.date}</h4>
                                    <p>Morning Activity: {day.morning?.activity}</p>
                                    <p>Afternoon Activity: {day.afternoon?.activity}</p>
                                    <p>Evening Activity: {day.evening?.activity}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export function MainFormContents() {
    return (
        <div style={{flex: 4, marginTop: '40px', overflowY: "auto"}}>
            <TripForm/>
        </div>
    );
}
