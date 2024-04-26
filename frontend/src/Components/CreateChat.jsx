 import useFetch from "../hooks/loadData.jsx";

export async function CreateChat() {
    try {
        // Assume you have endpoints that return all chats and forms to find the max ID
        const chatsResponse = await fetch(`http://localhost:5050/chats`);
        const formsResponse = await fetch(`http://localhost:5050/form`);

        if (!chatsResponse.ok || !formsResponse.ok) {
            throw new Error('Failed to fetch data');
        }

        const chatsData = await chatsResponse.json();
        // Calculate new ID based on the existing data
        const newChatId = Math.max(...chatsData.map(chat => chat.id)) + 1;
        const newFormId = newChatId;

        // Post to create a new chat with a new ID
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
            throw new Error('Failed to post new chat');
        }

        // Post to create a new form with a new ID
        const formResponse = await fetch(`http://localhost:5050/form`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: newFormId,
                chatId: newChatId,  // Link new form to new chat
                region: "region added"
            }),
        });

        if (!formResponse.ok) throw new Error('Failed to post new form');

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