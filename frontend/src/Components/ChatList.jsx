import dummy from '../frontDB/chatLog.json'
import styles from "../Sidebar.module.css";
import {Link} from "react-router-dom";
import useFetch from "../hooks/loadData.jsx";

export default function ChatList() {
    const plans = useFetch('https://japan.visit-with-tripper.site/api/v1/plans')
    console.log(dummy);
    function dateFilter(dateString) {
        const date = new Date(dateString);

        // Extract year, month, and day
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');

        // Return formatted date
        return `${year}/${month}/${day}`;
}

    return (
        <ul style={{listStyleType: 'none'}}>
            {plans.map(plan => (
                <li key={plan.trip_plan_id}>
                    {/*<ChatButton title={chat.title}/>*/}
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