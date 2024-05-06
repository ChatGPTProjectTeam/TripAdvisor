import { useState, useEffect } from 'react';

function useNestedFetch<T>(url: string): T {
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((responseData: T) => setData(responseData))
            .catch(error => {
                console.error('Fetching error:', error);
                setData(null); // Ensure to set to null on error
            });
    }, [url]);

    return data;
}

export default useNestedFetch;


