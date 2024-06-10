import React, {useEffect, useState} from "react";
import styles from "./MapInfo.module.css";
import TripForm from "./TripForm.jsx";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
"use client";

function MapInfo() {
    const googleMapApi = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
    const googleMapId = import.meta.env.VITE_APP_GOOGLE_MAPS_ID;
    console.log("entered?");
//     const [zoom, setZoom] = '12';
// useEffect(() => {
//         // Filter plans only after the data has been loaded and is not null
//         setZoom(zoom);
//     }, zoom);
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
            id: 2,
            position: { lat: 35.71990936280157, lng: 139.80145059753443 },
            title: "Example Festival 2",
            province: "일본 간사이 지방",
            month: 5,
            festival_content: "Details about Festival 2",
            festival_photo: "https://example.com/festival2.jpg",
            festival_link: "https://example.com/festival2"
        },
        {
            id: 3,
            position: { lat: 35.72990936280157, lng: 139.80145059753443 },
            title: "Example Festival 3",
            province: "일본 간사이 지방",
            month: 5,
            festival_content: "Details about Festival 2",
            festival_photo: "https://example.com/festival2.jpg",
            festival_link: "https://example.com/festival2"
        },
        {
            id: 4,
            position: { lat: 35.72990936280157, lng: 139.84145059753443 },
            title: "Example Festival 4",
            province: "일본 간사이 지방",
            month: 5,
            festival_content: "Details about Festival 2",
            festival_photo: "https://example.com/festival2.jpg",
            festival_link: "https://example.com/festival2"
        },
    ];

    const [openInfoWindowId, setOpenInfoWindowId] = useState(null);

    return (
        <div style={{ maxWidth: '1000px', height: '600px', margin: 'auto' }}>
            <APIProvider apiKey={googleMapApi}>
                <div style={{ height: '100%', width: '100%' }}>
                    <Map zoom={12} center={festivalDummy[0].position} mapId={googleMapId}>
                        {festivalDummy.map(marker => (
                            <AdvancedMarker
                                key={marker.id}
                                position={marker.position}
                                onClick={() => setOpenInfoWindowId(marker.id)}
                            />
                        ))}
                        {festivalDummy.map(marker => (
                            openInfoWindowId === marker.id && (
                                <InfoWindow
                                    key={marker.id}
                                    position={marker.position}
                                    onCloseClick={() => setOpenInfoWindowId(null)}
                                >
                                    <div>
                                        <p>{marker.title}</p>
                                        <p><strong>Province:</strong> {marker.province}</p>
                                        <p><strong>Month:</strong> {marker.month}</p>
                                        <p><strong>Details:</strong> {marker.festival_content}</p>
                                        <p><strong>Location:</strong> {marker.position.lat}, {marker.position.lng}</p>
                                        <a href={marker.festival_link} target="_blank" rel="noopener noreferrer">More Info</a>
                                    </div>
                                </InfoWindow>
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
