import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from "react-router-dom";
import styles from "../Sidebar.module.css";

function dateFilter(dateString) {
    const date = new Date(dateString);

    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    // Return formatted date
    return `${year}/${month}/${day}`;
}

async function fetchPlans(page) {
    try {
        const response = await fetch(`https://japan.visit-with-tripper.site/api/v1/plans?page=${page}`);
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
    const [plans, setPlans] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    useEffect(() => {
        const loadPlans = async () => {
            const newPlans = await fetchPlans(page);
            if (newPlans && newPlans.plan_list.length > 0) {
                setPlans(prevPlans => [...prevPlans, ...newPlans.plan_list]);
            } else {
                setHasMore(false); // No more data to fetch
            }
        };

        loadPlans();
    }, [page]);

    const lastPlanElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [hasMore]);

    return (
        <ul style={{ listStyleType: 'none', maxHeight: '980px', overflowY: 'auto' }}>
            {plans.map((plan, index) => (
                <li key={plan.trip_plan_id} ref={index === plans.length - 1 ? lastPlanElementRef : null}>
                    <div style={{ display: 'flex' }} className={`${styles.sidebarChatBox}`}>
                        <Link to={`/chat/${plan.trip_plan_id}`} className={`button-80 ${styles.sidebarLoadButton}`}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px' }}>
                                <span className="text">Target: {plan.province}</span>
                                <span>생성일자: {dateFilter(plan.created_at)}</span>
                            </div>
                            <div style={{ color: '#ffffff', fontSize: '16px' }}>{plan.province} 여행코스</div>
                        </Link>
                    </div>
                </li>
            ))}
            {hasMore && <div>Loading...</div>}
        </ul>
    );
}
