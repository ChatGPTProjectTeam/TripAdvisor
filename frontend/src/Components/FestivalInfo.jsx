import PopUp from "./PopUp.jsx";
import styles from "./PopUp.module.css";
import {useParams, useNavigate} from "react-router-dom";
import React from "react";
import asyncFetch from "../hooks/loadWaitData.jsx";
import {APIProvider,Map,AdvancedMarker,Pin,InfoWindow,} from "@vis.gl/react-google-maps";


const FestivalInfo = () => {
    const {targetId} = useParams();
    const navigate = useNavigate();
    const { data: tripData, loading, error } = asyncFetch(`https://api.visit-with-tripper.site/api/v1/plan/${targetId}`);


    const festivalDummy = {
        festival_id: 1,
        title: "스미다 공원 벚꽃 축제",
        province: "일본 간토 지방",
        month: 3,
        festival_content: "3월 16일부터 4월 초까지 벚꽃 축제",
        festival_photo: "https://frontend-tripper.s3.ap-northeast-2.amazonaws.com/festival_images/smida.webp",
        latitude: "35.71390976284157",
        longitude: "139.80145059753443",
        festival_link: "https://www.gotokyo.org/kr/spot/ev188/index.html"
    }

    const handleRedirect = () => {
        navigate(`/chat/${targetId}`);
    };
    // const googleMap = () => {
    //     return (
    //         <APIProvider apiKey={}>
    //             <div>GOOGLE MAP</div>
    //         </APIProvider>
    //
    //     )
    // };

    return(
        <div style={{ display: 'block', padding: '20px' }}>
            <h1>{festivalDummy.title}</h1>
            <div style={{display:'flex', maxWidth:'300px', margin:'auto'}}>
                <img src={festivalDummy.festival_photo} alt={festivalDummy.title}
                     style={{width: '100%', maxHeight: '400px', objectFit: 'cover'}}/>
            </div>

            <p><strong>Province:</strong> {festivalDummy.province}</p>
            <p><strong>Month:</strong> {festivalDummy.month}</p>
            <p><strong>Details:</strong> {festivalDummy.festival_content}</p>
            <p><strong>Location:</strong> {festivalDummy.latitude}, {festivalDummy.longitude}</p>
            <a href={festivalDummy.festival_link} target="_blank" rel="noopener noreferrer">More Info</a>
            <div style={{ marginTop: '10px' }}>
                <button onClick={handleRedirect} className={styles.modalButton}>
                    돌아가기
                </button>
            </div>
            <PopUp></PopUp>
        </div>
    );
}

export default FestivalInfo