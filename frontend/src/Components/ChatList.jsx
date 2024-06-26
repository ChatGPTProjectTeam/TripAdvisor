// import dummy from '../frontDB/chatLog.json'
import styles from "../Sidebar.module.css";
import React, {useEffect, useState, useRef, useCallback} from 'react';
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

async function fetchPlans(pages) {
    try {
        const response = await fetch(`https://api.visit-with-tripper.site/api/v1/plans${location.search}`);

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
    const { data: target, loading, error } = asyncFetch(`https://api.visit-with-tripper.site/api/v1/plans${location.search}`);
    // console.log("can you see this:" ,tripData);
    useEffect(() => {
        setPlans(target);
    },[target])


    if (!plans) {
        return <div>Loading...</div>;
    }
    // console.log("what's in it:", plans)

    return (
        // <ul className={`${styles.sidebarChatList}`}>
        <ul className={`${styles.sidebarChatList}`}>
            {target.plan_list.slice().reverse().map((plan) => (
                <li key={plan.trip_plan_id}>
                    <div style={{display: 'flex'}} className={`${styles.sidebarChatBox}`}>
                        <Link to={`/chat/${plan.trip_plan_id}`} className={`button-80 ${styles.sidebarLoadButton} bg-sky-100`}>
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px',color:'#374151'}}>
                                <span style={{color:'#374151'}} className="text">여행지 : {plan.province}</span>
                                {/*<span>생성일자: {dateFilter(plan.created_at)}</span> */}
                            </div>
                            <div style={{color: '#6b7280', fontSize: '16px'}}>{plan.trip_plan_id}번째 여행코스</div>
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    );
}
