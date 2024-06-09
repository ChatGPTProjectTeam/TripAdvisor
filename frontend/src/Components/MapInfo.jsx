import React, {useState} from "react";
import styles from "./MapInfo.module.css";
import TripForm from "./TripForm.jsx";

function MapInfo() {
    const googleMapApi = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
    console.log("entered?");

    return(
        <div>
            hello
            <p>{googleMapApi ? 'api key is here' : 'API key not found'}</p>
        </div>

    )
}

export default MapInfo;
