import React, {useEffect, useState} from 'react'
import MainContents from "./MainContent.jsx";
import {Link} from "react-router-dom";

function EmptyPage() {

    return(
        <div style={{flex:'4'}}>
            <div>
                <h1>주소로 장난 ㄴㄴ~</h1>
                <Link to="/"><h2>돌아가기</h2></Link>
            </div>
        </div>

    )
}

export default EmptyPage;