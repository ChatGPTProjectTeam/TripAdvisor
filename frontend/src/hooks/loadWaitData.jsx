import { useState, useEffect } from 'react';

export default function useAsyncFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Initialize loading and error state on every URL change
        setLoading(true);
        setError(null);

        // Function to fetch data
        async function fetchData() {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData); // Successfully fetched data
                setLoading(false); // End loading
            } catch (err) {
                console.error('There was a problem with the fetch operation:', err);
                setError(err.message); // Set error message
                setLoading(false); // Ensure loading is false even when there is an error
            }
        }

        fetchData();
    }, [url]); // Dependency array with URL to refetch on changes

    return { data, loading, error };
}




// const fetchData = async () => {
        //     setLoading(true); // Mark the beginning of data fetching
        //     try {
        //         const response = await doubleAsyncBitch(url);
        //         if (!response.ok) {
        //             throw new Error(`Error: ${response.status} ${response.statusText}`);
        //         }
        //         const targetData = await response.json();
        //         setData(targetData);
        //     } catch (err) {
        //         setError(err.message);
        //     } finally {
        //         setLoading(false); // Data fetching is complete
        //     }
        // };
        // fetchData();