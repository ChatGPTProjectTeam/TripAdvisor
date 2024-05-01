import {useParams} from "react-router-dom";
import '../Sidebar.module.css'
import './TripForm.jsx'
import TripForm from "./TripForm.jsx";
import useFetch from "../hooks/loadData.jsx";
import FlightPlan from "./FlightPlan.jsx";


// this is main contents
export default function MainPlanContents() {
    const targetForm = parseInt(useParams().id, 10)
        const forms = useFetch(`http://localhost:5050/form?id=${targetForm}`)


    return (
        <div style={{flex: 4}}>
            {/*<TripForm/>*/}
            {forms.map((place, id)=> (
                <div key={id}>
                    <h1>{place.province}</h1>
                    {/*<TripForm/>*/}
                    fetch trip plan here
                </div>
            ))}
        </div>
    );
}

export function MainFormContents() {
    return (
        <div style={{flex: 4, marginTop:'40px'}}>
            <TripForm/>
        </div>
    );
}
