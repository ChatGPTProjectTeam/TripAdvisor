 import useFetch from "../hooks/loadData.jsx";

export async function CreateForm(formData) {
    try {
        const timestamp = new Date().toISOString();

        // POST request to create a new chat
        const chatResponse = await fetch(`http://localhost:5050/chats`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: "chat added",
                createdAt: timestamp,
                updatedAt: timestamp,
                isOpen: false
            }),
        });

        if (!chatResponse.ok) {
            alert('Failed to post new chat');
            return; // Stop execution if the chat POST fails
        }

        const chatData = await chatResponse.json();
        const newChatId = chatData.id; // Assuming the server returns the new ID

        // POST request to create a new form using chat ID
        const formResponse = await fetch(`http://localhost:5050/form`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: newChatId,
                ...formData
            }),
        });

        if (!formResponse.ok) {
            alert('Failed to post new form');
            return; // Stop execution if the form POST fails
        }

        alert("New chat and form created successfully!");
        return {
            chat: chatData,
            form: await formResponse.json(),
        };

    } catch (error) {
        console.error("Error in CreateForm:", error);
        alert("Failed to create new chat and form.");
        throw error;
    }
}