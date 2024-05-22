import React from "react";
import Markdown from "react-markdown";


function MapForForm() {
    const mapInfoTitle = `## 각 지방을 대표하는 도시 목록`;
    const mapInfo = `

**홋카이도 지방**  - 삿포로

**도호쿠 지방** - 센다이

**간토 지방** - 도쿄

**주부 지방** - 나고야

**간사이 지방** - 오사카

**주고쿠 지방** - 히로시마

**시코쿠 지방** - 마쓰야마

**규슈/오키나와 지방** - 후쿠오카
`;

    return(
        <div style={{width: '300px', height: '700px'}}>
            <div>
                <img src="/JapanMap.png" style={{width: '100%', height: '100'}}
                     alt="Description of the image"/>
            </div>
            <div style={{width:'100%', height:'100%', fontSize:'14px', marginTop:'20px'}}>
                <div style={{marginBottom:'10px'}}><Markdown>{mapInfoTitle}</Markdown></div>
                <Markdown>{mapInfo}</Markdown>
            </div>
        </div>

    )
}

export default MapForForm;