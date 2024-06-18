import React, {useEffect, useState} from 'react'
import MainContents from "./MainContent.jsx";
import {Link} from "react-router-dom";

function EmptyPage() {

    return(
        <div className="bg-grey-300 h-full">
            <div>
                <h1>Wrong Path</h1>
                <Link to="/"><h2>돌아가기</h2></Link>
            </div>
        </div>

    )
}

export default EmptyPage;