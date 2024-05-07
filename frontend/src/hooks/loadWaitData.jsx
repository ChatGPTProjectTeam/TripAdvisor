import {useEffect, useState} from "react";

export default function useWaitFetch(url) {
    // Add states for data and loading
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // Function to fetch data and handle state updates
        const fetchData = async () => {
            setLoading(true); // Set loading state to true before fetching data
            try {
                const response = await fetch(url); // Fetch data
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const result = await response.json(); // Parse the JSON result
                setData(result); // Update data state with fetched data
            } catch (error) {
                console.error("Fetch error: ", error);
                setData(null); // Handle any errors by setting data to null
            } finally {
                setLoading(false); // Set loading state to false after fetching
            }
        };

        fetchData(); // Trigger data fetching
    }, [url]); // Dependency array with URL to refetch on changes

    return { data, loading }; // Return both data and loading states
}