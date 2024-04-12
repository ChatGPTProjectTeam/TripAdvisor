import React, { useState } from 'react';
import './Sidebar.css'; // Assuming you have some basic styles

function Sidebar() {
    const [tabs, setTabs] = useState(['Home']); // Initial tab

    const addNewTab = () => {
        // Add a new tab with a simple naming scheme
        const newTabName = `Tab ${tabs.length + 1}`;
        setTabs([...tabs, newTabName]);
    };

    return (
        <div className="sidebar">
            <div className="addButton">
                <button onClick={addNewTab}>New</button>

            </div>
            <ul>
                {tabs.map((tab, index) => (
                    <li key={index}>
                        <a href="" target="_blank">
                            {tab}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;