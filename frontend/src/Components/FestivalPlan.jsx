import PopUp from "./PopUp.jsx";
import styles from "./PopUp.module.css";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import asyncFetch from "../hooks/loadWaitData.jsx";
import ReactMarkdown from 'react-markdown';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import Markdown from 'react-markdown'

const FestivalPlan = ({ component, targetId }) => {
    const navigate = useNavigate();
    const { data: tripData, loading, error } = asyncFetch(`https://api.visit-with-tripper.site/api/v1/plan/${targetId}`);
    const [festivalInfo, setFestivalInfo] = useState(component.festival_info || {});

    useEffect(() => {
        if (component.festival_info) {
            setFestivalInfo(component.festival_info);
        }
    }, [component.festival_info, targetId]);

    if (component.component_type !== 'festival_info') {
        return null;
    }

    const regex = /일본/;
    const provinceFileter = festivalInfo.province ? festivalInfo.province.replace(regex, "").trim() : '';
    const isFestivalBlank =  festivalInfo.month === 0;

    const handleRedirect = () => {
        navigate(`/chat/${targetId}`);
    };

    // console.log(festivalInfo.festival_content_markdown);
    // console.log("############");
    return (
        <div style={{ display: 'block' }}>
            <div className='title-container'><p> {provinceFileter} 행사 정보</p></div>
            {isFestivalBlank ? (
                <div style={{ marginTop: '20px', marginBottom: '20px', display:'flex', flexDirection:'column'}}>
                    <div style={{margin:'auto'}}><img src="/construction.svg" alt="Logo" width="100px" height="40px" /></div>
                    <h3>정보를 불러올 수가 없어요</h3>
                </div>
            ) : (
                <>
                    <h2>{festivalInfo.title}</h2>
                    <div style={{ display: 'flex', maxWidth: '300px', margin: 'auto' }}>
                        {festivalInfo.festival_photo && (
                            <img
                                src={festivalInfo.festival_photo}
                                alt={festivalInfo.title}
                                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
                            />
                        )}
                    </div>
                    {!isFestivalBlank && festivalInfo.province && <p><strong>Province:</strong> {festivalInfo.province}</p>}
                    {!isFestivalBlank && festivalInfo.month && <p><strong>Month:</strong> {festivalInfo.month}</p>}
                    {!isFestivalBlank && festivalInfo.festival_content_markdown && (
                        <div>
                            <strong>Details:</strong> 
                            <ReactMarkdown className="prose">{festivalInfo.festival_content_markdown}</ReactMarkdown>
                        </div>
                    )}
                    {!isFestivalBlank && festivalInfo.latitude && festivalInfo.longitude && (
                        <p><strong>Location:</strong> {festivalInfo.latitude}, {festivalInfo.longitude}</p>
                    )}
                    {!isFestivalBlank && festivalInfo.festival_link && (
                        <a href={festivalInfo.festival_link} target="_blank" rel="noopener noreferrer">More Info</a>
                    )}
                </>
            )}
        </div>
    );
}


export default FestivalPlan;
