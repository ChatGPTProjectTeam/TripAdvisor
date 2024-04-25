import React, {useEffect, useState} from 'react'
import '../Sidebar.module.css'
import dummy from '../frontDB/chatLog.json'
import './TripForm.jsx'
import TripForm from "./TripForm.jsx";


// this is main contents
function MainContents() {
    // const regionData = dummy.form.find(item => item.id === id);

    return (
        <div style={{flex: 4}}>
            <TripForm/>
        </div>
    );
}
export default MainContents;