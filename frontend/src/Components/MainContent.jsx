import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/loadData.jsx';
import FlightPlan from "./FlightPlan.jsx";
import TripForm from "./TripForm.jsx";
import AccommodationPlan from "./AccommodationPlan.jsx";
import DayPlan from "./DayPlan.jsx";
import LoadingScreen from "./LoadingScreen.jsx";

export default function MainPlanContents() {
    const { targetId } = useParams();
    //THIS IS TEMPORAL JSON SERVER DATA
    //YOU MUST ADJUST THIS API FOR DEMO!!!
    const tripData = useFetch(`http://localhost:5050/plan_list`);
    const targetPlans = tripData.filter(plan => plan.trip_plan_id === parseInt(targetId, 10));
    const provinceName = targetPlans.map(targetPlan => targetPlan.province);
    const [loading, setLoading] = useState(true); // State to track loading status
    let observer = new IntersectionObserver((e)=> {

    })

    useEffect(() => {
        if (tripData.length > 0) {
            setLoading(false); // Set loading to false when data is fetched
        }
    }, [tripData]);

    if (loading) {
        return <LoadingScreen />; // Display loading spinner while loading
    }

    const PlanTitleLogo = () => (
        <div style={{display:'flex', alignItems:'center', marginLeft:'5px',marginRight:'5px'}}>
            <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_3_202)">
                    <path
                        d="M24.4167 23.349L12.9963 6.53273C12.7649 6.19188 12.4144 5.99646 12.035 5.99646C11.6461 5.99646 11.2918 6.19954 11.0628 6.55361L0.199393 23.3536C-0.0369559 23.7193 -0.0645026 24.1174 0.12377 24.4464C0.312043 24.7756 0.675599 24.9641 1.12112 24.9641H23.5164C23.9654 24.9641 24.3287 24.7739 24.5136 24.4422C24.6985 24.1104 24.6632 23.7122 24.4167 23.349ZM12.0417 7.31354C12.1558 7.31354 12.2221 7.41988 12.2221 7.41988L19.1439 17.3914C19.5899 18.1681 19.2912 18.409 18.4451 17.6143C18.4451 17.6143 15.9397 14.8008 15.0031 13.9604C14.7679 13.7493 14.2899 13.6952 14.0236 13.8682C13.3303 14.3185 12.1232 15.457 11.4219 15.8956C11.1526 16.0641 10.7869 15.9193 10.7108 15.6177C10.459 14.6213 10.2483 12.5684 9.98264 11.5753C9.90231 11.2748 9.60176 11.2194 9.34309 11.4028C9.27904 11.4483 9.1425 11.5276 9.07412 11.5667C8.99499 11.6118 9.03911 11.548 9.03911 11.548L11.8712 7.40898C11.871 7.40919 11.9226 7.31354 12.0417 7.31354Z"
                        fill="white"/>
                    <path
                        d="M30.8028 21.0049L20.2929 5.52933C20.0799 5.21572 19.7574 5.03583 19.4082 5.03583C19.0503 5.03583 18.7243 5.22272 18.5136 5.54862L16.318 8.94402C16.318 8.94402 16.236 9.06546 16.2996 9.20214C16.3706 9.35479 16.5705 9.63192 16.6798 9.76189C16.765 9.8631 16.873 9.69152 16.873 9.69152L19.2767 6.16276C19.2767 6.16276 19.3419 6.06877 19.4146 6.06877C19.4974 6.06877 19.5599 6.1689 19.5599 6.1689L26.3999 15.9625C26.5942 16.2357 26.0803 16.2369 25.6321 15.8891C24.9549 15.3636 23.6149 14.2943 22.9359 13.7709C22.7049 13.5929 22.2835 13.5325 22.0346 13.6861C21.668 13.9126 20.7953 14.5739 20.4396 14.8914C20.2487 15.0616 20.388 15.2217 20.388 15.2217L25.1713 22.2652C25.1713 22.2652 25.3066 22.4912 25.5213 22.4912C26.6346 22.4912 29.9747 22.4912 29.9747 22.4912C30.3877 22.4912 30.7224 22.3161 30.8924 22.0109C31.0623 21.7057 31.0297 21.339 30.8028 21.0049Z"
                        fill="white"/>
                </g>
                <defs>
                    <clipPath id="clip0_3_202">
                        <rect width="31" height="30" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
    return (
        <div style={{flex: 4, marginTop: '40px', overflowY: "auto"}}>
            <div style={{display:'flex', justifyContent:'center'}}>
                <div>
                   <div style={{display: "flex", justifyContent: 'center',maxWidth:'980px',marginBottom:'20px'}}>
                       <PlanTitleLogo/>
                       <h1 style={{fontSize:'30px'}}> {provinceName} Plan</h1>
                       <PlanTitleLogo/>
                   </div>
            {targetPlans.length > 0 ? (
                targetPlans.map((targetPlan, index) => (
                    <div key={index}>
                        {targetPlan.plan_component_list.map((component, index) => (
                            <div key={index}>

                                {/*<h3>Component {index + 1}</h3>*/}
                                <FlightPlan component={component} targetId={targetId}/>
                                <AccommodationPlan component={component} targetId={targetId}/>
                                <DayPlan component={component} targetId={targetId} componentId={index + 1}/>

                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p>No trip plan found for chat ID {targetId}</p>
            )}
                </div>

            </div>

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
