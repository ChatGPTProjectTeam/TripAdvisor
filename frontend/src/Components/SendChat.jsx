 import useFetch from "../hooks/loadData.jsx";

export async function SendChat(fixedRequestedData) {
    try {

        // you need to doublecheck for posting to form and then get response from same api form
        // THE TRIP COURSE IS GETTING RESPONSE DATA FROM TEMPORAL JSON DATA CALLED 'http://localhost:5050/PlanData'
        // DO NOT FORGET TO CHANGE PlanData API FROM MainContent.jsx
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

        alert("response arrived");
        const responseData = {
            day: 1,
            activities: [
                "도쿄 도착 및 도심 탐방",
                "도쿄 도착 및 호텔 체크인",
                "아사쿠사(Asakusa) 지역 탐방 (센소지 텐플, 나카미세 거리 등)",
                "아사쿠사에서 전통 일본 음식을 즐기는 저녁 식사"
            ]
        };

        return {
            NewMessage: responseData
        };

    } catch (error) {
        console.error("Error in CreateForm:", error);
        alert("Failed to create new chat and form.");
        throw error;
    }
}