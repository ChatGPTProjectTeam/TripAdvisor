 import useFetch from "../hooks/loadData.jsx";

export async function CreateChat() {
    try {
        // assign this for fetching
        const chatsResponse = await fetch(`http://localhost:5050/chats`);
        const formsResponse = await fetch(`http://localhost:5050/form`);

        if (!chatsResponse.ok || !formsResponse.ok) {
            alert('Failed to fetch data');
        }

        const chatsData = await chatsResponse.json();
        // make id
        const newChatId = Math.max(...chatsData.map(chat => chat.id)) + 1;
        const newFormId = newChatId;

        // add new data
        const chatResponse = await fetch(`http://localhost:5050/chats`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: newChatId,
                title: "chat added",
                isOpen: false
            }),
        });

        if (!chatResponse.ok) {
            alert('Failed to post new chat');
        }

        // post to make new form
        const formResponse = await fetch(`http://localhost:5050/form`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: newFormId,
                chatId: newChatId,
                region: "region added"
            }),
        });

        if (!formResponse.ok) {
            alert('Failed to post new form');
        }
        alert("New chat and form created successfully!");
        return {
            chat: await chatResponse.json(),
            form: await formResponse.json(),
        };

    } catch (error) {
        console.error("Error in CreateChat:", error);
        alert("Failed to create new chat and form.");
        throw error;
    }
}