 import useFetch from "../hooks/loadData.jsx";
 import {useParams} from "react-router-dom";

export async function SendChat(fixedRequestedData, targetId) {
    try {
        const formResponse = await fetch(`http://localhost:5050/test`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...fixedRequestedData
            }),
        });

        if (!formResponse.ok) {
            alert('Failed to post new form');
            return; // Stop execution if the form POST fails
        }

        const responseData = await formResponse.json();
        alert('reloading');
        return {
            NewMessage: responseData
        };

    } catch (error) {
        console.error("Error in SendChat:", error);
        alert("Failed to send chat.");
        throw error;
    }
}
