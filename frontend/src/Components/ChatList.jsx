import dummy from '../frontDB/chatLog.json'
import styles from "../Sidebar.module.css";
import {Link} from "react-router-dom";
import useFetch from "../hooks/loadData.jsx";

export default function ChatList() {
    const chats = useFetch('http://localhost:5050/chats')
    console.log(dummy);

    return (
        <ul>
            {chats.map(chat => (
                <li key={chat.id}>
                    {/*<ChatButton title={chat.title}/>*/}
                    <div style={{display: 'flex'}} className={`${styles.sidebarChatBox}`}>
                        <Link to={`/chat/${chat.id}`} className={`button-80 ${styles.sidebarLoadButton}`}>
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px'}}>
                                <span className="text">Target: {chat.title}</span>
                                <span>??시간</span> {/* You might want to replace ??시간 with actual dynamic data if available */}
                            </div>
                            <div style={{color: '#ffffff', fontSize: '16px'}}>새 여행코스</div>
                        </Link>
                    </div>

                </li>
            ))}
        </ul>
    );
}