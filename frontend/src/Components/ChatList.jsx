import dummy from '../frontDB/chatLog.json'
import styles from "../Sidebar.module.css";
import {Link} from "react-router-dom";
import useFetch from "../hooks/loadData.jsx";

export default function ChatList() {
    const chats = useFetch('http://localhost:5050/chats')
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
        <ul>
            {chats.map(chat => (
                <li key={chat.id}>
                    {/*<ChatButton title={chat.title}/>*/}
                    <div style={{display: 'flex'}} className={`${styles.sidebarChatBox}`}>
                        <Link to={`/chat/${chat.id}`} className={`button-80 ${styles.sidebarLoadButton}`}>
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px'}}>
                                <span className="text">Target: {chat.title}</span>
                                <span>생성일자: {dateFilter(chat.createdAt)}</span> {/* You might want to replace ??시간 with actual dynamic data if available */}
                            </div>
                            <div style={{color: '#ffffff', fontSize: '16px'}}>새 여행코스</div>
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    );
}