import dummy from './frontDB/chatLog.json'
import {useEffect, useState} from "react";
import {ChatButton} from "./ChatButton.jsx";

export default function ChatList() {
    console.log(dummy);
    const [chats, setChats] = useState([]);
    useEffect(() => {
        // getting data from server?
        setChats(dummy.chats);
    }, []);
    return (
        <ul>
            {chats.map(chat => (
                <li key={chat.id}>
                    <ChatButton title={chat.title}/>
                </li>
            ))}
        </ul>
    );
}