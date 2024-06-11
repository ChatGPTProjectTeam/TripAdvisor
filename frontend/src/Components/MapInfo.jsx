import React, {useEffect, useState} from "react";
import styles from "./MapInfo.module.css";
import TripForm from "./TripForm.jsx";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import festivalPlan from "./FestivalPlan.jsx";
"use client";

function MapInfo({locationData, festivalData, targetMapId}) {
    const googleMapApi = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
    const googleMapId = import.meta.env.VITE_APP_GOOGLE_MAPS_ID;
    const [locationForPlan, setLocationForPlan] = useState([]);
    const [festivalForPlan, setFestivalForPlan] = useState([]);

    useEffect(() => {
        if (locationData) {
            setLocationForPlan(locationData);
        }
    }, [locationData, targetMapId]);
    useEffect(() => {
        if (festivalData) {
            setFestivalForPlan(festivalData);
        }
    }, [festivalData, targetMapId]);

    const festivalDummy = [
        {
            festival_ID: 1,
            position: { lat: 35.71390976284157, lng: 139.80145059753443 },
            title: "스미다 공원 벚꽃 축제",
            province: "일본 간토 지방",
            month: 3,
            festival_content: "3월 16일부터 4월 초까지 벚꽃 축제",
            festival_photo: "https://frontend-tripper.s3.ap-northeast-2.amazonaws.com/festival_images/smida.webp",
            festival_link: "https://www.gotokyo.org/kr/spot/ev188/index.html"
        },
        {
            festival_ID: 2,
            position: { lat: 35.71990936280157, lng: 139.80145059753443 },
            title: "Example Festival 2",
            province: "일본 간사이 지방",
            month: 5,
            festival_content: "Details about Festival 2",
            festival_photo: "https://example.com/festival2.jpg",
            festival_link: "https://example.com/festival2"
        },
        {
            festival_ID: 3,
            position: { lat: 35.72990936280157, lng: 139.80145059753443 },
            title: "Example Festival 3",
            province: "일본 간사이 지방",
            month: 5,
            festival_content: "Details about Festival 2",
            festival_photo: "https://example.com/festival2.jpg",
            festival_link: "https://example.com/festival2"
        },
        {
            festival_ID: 4,
            position: { lat: 35.72990936280157, lng: 139.84145059753443 },
            title: "Example Festival 4",
            province: "일본 간사이 지방",
            month: 5,

        },
    ];
    // const festivalLatitude = parseFloat(festivalForPlan.latitude);
    // const festivalLongitude = parseFloat(festivalForPlan.longitude);
    // const festivalPosition = {
    //     position: { lat: {festivalLatitude}, lng: {festivalLongitude} }
    // }

    const [openInfoWindowId, setOpenInfoWindowId] = useState(null);

    return (
        <div style={{maxWidth: '1000px', height: '600px', margin: 'auto'}}>
            <h1>{festivalForPlan.name}</h1>

            <APIProvider apiKey={googleMapApi}>
                <div style={{height: '100%', width: '100%'}}>
                    <Map defaultZoom={12} defaultCenter={{lat: locationData[0].lat, lng: locationData[0].lon}}
                         mapId={googleMapId}>
                        {locationForPlan.map((marker, index) => (
                            <AdvancedMarker
                                key={index}
                                position={{lat: locationForPlan[index].lat, lng: locationForPlan[index].lon}}
                                onClick={() => setOpenInfoWindowId(index)}
                            />
                        ))}
                        {/*<AdvancedMarker*/}
                        {/*        position={festivalPosition}*/}
                        {/*        // onClick={() => setOpenInfoWindowId(index)}*/}
                        {/*    />*/}
                        {/*<AdvancedMarker*/}
                        {/*        position={{lat: festivalData[index].lat, lng: locationData[index].lon}}*/}
                        {/*        onClick={() => setOpenInfoWindowId(index)}*/}
                        {/*    />*/}
                        {locationForPlan.map((marker, index) => (
                            openInfoWindowId === index && (
                                <InfoWindow
                                    key={index}
                                    position={{lat: locationData[index].lat, lng: locationData[index].lon}}
                                    onCloseClick={() => setOpenInfoWindowId(null)}
                                >
                                    <div>
                                        <p>{marker.title}</p>
                                        <p><strong>이름:</strong> {marker.name}</p>
                                        <p><strong>설명:</strong> {marker.description}</p>
                                        {/*<p><strong>Details:</strong> {marker.image_url}</p>*/}
                                        <p>
                                            <strong>Location:</strong> {locationData[index].lat}, {locationData[index].lon}
                                        </p>
                                        <a href={marker.image_url} target="_blank" rel="noopener noreferrer">사진 보기</a>
                                    </div>
                                </InfoWindow>
                                // <InfoWindow
                                //     key={index}
                                //     position={{lat: locationData[index].lat, lng: locationData[index].lon}}
                                //     onCloseClick={() => setOpenInfoWindowId(null)}
                                // >
                                //     <div>
                                //         <p>{marker.title}</p>
                                //         <p><strong>Province:</strong> {marker.name}</p>
                                //         <p><strong>Month:</strong> {marker.month}</p>
                                //         <p><strong>Details:</strong> {marker.festival_content}</p>
                                //         <p>
                                //             <strong>Location:</strong> {locationData[index].lat}, {locationData[index].lon}
                                //         </p>
                                //         <a href={marker.festival_link} target="_blank" rel="noopener noreferrer">More
                                //             Info</a>
                                //     </div>
                                // </InfoWindow>
                            )
                        ))}
                    </Map>
                </div>
                {/*<p>{googleMapApi ? 'API key is here' : 'API key not found'}</p>*/}
            </APIProvider>

        </div>

    );
}

export default MapInfo;
