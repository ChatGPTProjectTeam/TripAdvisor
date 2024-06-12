import React, { useEffect, useState } from "react";
import styles from "./MapInfo.module.css";
import { APIProvider, Map, AdvancedMarker, InfoWindow, Pin } from "@vis.gl/react-google-maps";
"use client";

function MapInfo({ mapDataList, targetMapId }) {
    const googleMapApi = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
    const googleMapId = import.meta.env.VITE_APP_GOOGLE_MAPS_ID;
    const [openInfoWindowId, setOpenInfoWindowId] = useState(null);
    const [mapData, setMapData] = useState(mapDataList);

    useEffect(() => {
        setMapData(mapDataList);
    }, [mapDataList, targetMapId]);

    return (
        <div style={{ maxWidth: '1000px', height: '600px', margin: 'auto' }}>
            <APIProvider apiKey={googleMapApi}>
                <div style={{ height: '100%', width: '100%' }}>
                    {mapDataList && mapDataList.length > 0 && (
                        <Map
                            defaultZoom={12}
                            defaultCenter={{ lat: mapDataList[0].lat, lng: mapDataList[0].lon }}
                            mapId={googleMapId}
                        >
                            {mapDataList.map((marker, index) => (
                                <AdvancedMarker
                                    key={index}
                                    position={{ lat: marker.lat, lng: marker.lon }}
                                    onClick={() => setOpenInfoWindowId(index)}
                                >
                                    {marker.type === 'accommodation' && (
                                        <Pin
                                            background="yellow"
                                        />
                                    )}
                                    {marker.type === 'festival' && (
                                        <Pin
                                            background="green"
                                        />
                                    )}
                                    {!['accommodation', 'festival'].includes(marker.type) && (
                                        <Pin
                                            background="default"
                                        />
                                    )}
                                </AdvancedMarker>
                            ))}
                            {mapDataList.map((marker, index) => (
                                openInfoWindowId === index && (
                                    <InfoWindow
                                        key={index}
                                        position={{ lat: marker.lat, lng: marker.lon }}
                                        onCloseClick={() => setOpenInfoWindowId(null)}
                                    >
                                        <div>
                                            <p><strong>Type:</strong> {marker.type}</p>
                                            <p><strong>Description 1:</strong> {marker.descriptionOne}</p>
                                            <p><strong>Description 2:</strong> {marker.descriptionTwo}</p>
                                            <p><strong>Location:</strong> {marker.lat}, {marker.lon}</p>
                                        </div>
                                    </InfoWindow>
                                )
                            ))}
                        </Map>
                    )}
                </div>
            </APIProvider>
        </div>
    );
}

export default MapInfo;
