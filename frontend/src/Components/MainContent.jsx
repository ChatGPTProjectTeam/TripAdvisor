import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/loadData.jsx';
import FlightPlan from "./FlightPlan.jsx";
import TripForm from "./TripForm.jsx";
import AccommodationPlan from "./AccommodationPlan.jsx";
import DayPlan from "./DayPlan.jsx";

export default function MainPlanContents() {
    const { courseId } = useParams();
    const [targetFormData, setTargetFormData] = useState([]);
    const tripData = useFetch(`http://localhost:5050/PlanData`);
    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5050/form/${courseId}`);
            const data = await response.json();
            setTargetFormData(data)
        } catch (error) {
            console.error("Fetching error:", error);
        }
    };
    fetchData();
}, [courseId]);
    console.log(targetFormData.province);
    const provinceName = targetFormData.province;
    const targetPlans = tripData.filter(plan => plan.chatId === parseInt(courseId, 10));
    return (
        <div style={{flex: 4, marginTop: '40px', overflowY: "auto"}}>
            <h1> {provinceName} Plan</h1>
            {targetPlans.length > 0 ? (
                targetPlans.map((targetPlan, index) => (
                    <div key={index}>
                        <h2>Trip Plan ID: {targetPlan.tripPlanId}</h2>
                        {targetPlan.tripPlan.map((component, index) => (
                            <div key={index}>

                                <h3>Component {index + 1}</h3>
                                <DayPlan component={component} courseId={courseId} />
                                <FlightPlan component={component} courseId={courseId} />
                                <AccommodationPlan component={component} courseId={courseId}/>

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
