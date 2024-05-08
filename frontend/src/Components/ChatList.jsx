// import dummy from '../frontDB/chatLog.json'
import styles from "../Sidebar.module.css";
import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import useFetch from "../hooks/loadData.jsx";
import asyncFetch from "../hooks/loadWaitData.jsx";

function dateFilter(dateString) {
    const date = new Date(dateString);

    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    // Return formatted date
    return `${year}/${month}/${day}`;
}

async function fetchPlans() {
    try {
        const response = await fetch('https://japan.visit-with-tripper.site/api/v1/plans');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}


export default function ChatList() {
    const [plans, setPlans] = useState(null);
    const { data: target, loading, error } = asyncFetch('https://japan.visit-with-tripper.site/api/v1/plans');
    // console.log("can you see this:" ,tripData);
    useEffect(() => {
        setPlans(target);
    },[target])


    if (!plans) {
        return <div>Loading...</div>;
    }
    console.log("what's in it:", plans)

    return (
        <ul style={{listStyleType: 'none'}}>
            {target.plan_list.map((plan) => (
                <li key={plan.trip_plan_id}>
                    <div style={{display: 'flex'}} className={`${styles.sidebarChatBox}`}>
                        <Link to={`/chat/${plan.trip_plan_id}`} className={`button-80 ${styles.sidebarLoadButton}`}>
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px'}}>
                                <span className="text">Target: {plan.province}</span>
                                <span>생성일자: {dateFilter(plan.created_at)}</span> {/* You might want to replace ??시간 with actual dynamic data if available */}
                            </div>
                            <div style={{color: '#ffffff', fontSize: '16px'}}>{plan.province} 여행코스</div>
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    );
}
