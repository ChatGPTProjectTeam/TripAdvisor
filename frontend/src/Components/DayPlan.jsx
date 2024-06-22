import React, { useEffect, useState } from 'react';
import ReloadIcon from '../icons/reload-button-icon.svg';
import { SendChat } from "./SendChat.jsx";
import ReactMarkdown from 'react-markdown';
import { useNavigate } from "react-router-dom";
import DayPlanLoadingScreen from "./DayPlanLoadingScreen.jsx";
import MapInfo from "./MapInfo.jsx";
import festivalPlan from "./FestivalPlan.jsx";

const InputComponent = ({ id, value, placeholder, onChange }) => {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="text"
      className="message__input"
      id={id}
      placeholder={placeholder}
      value={value}
      required=""
      onChange={handleInputChange}
    />
  );
};

const ReloadButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="reload-button" style={{ border: 'none', background: 'none', color: 'black' }}>
      <img src={ReloadIcon} alt="Reload" style={{ width: 20, height: 20 }} />
    </button>
  );
};

const DayPlan = ({ locationComponent, component, targetId, componentId, mapData }) => {
  const [inputMessages, setInputMessages] = useState({});
  const [activityText, setActivityText] = useState(component.activity);
  const [originalActivityText, setOriginalActivityText] = useState(component.activity);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [locationPlan, setLocationPlan] = useState([]);
  const [festivalPlan, setFestivalPlan] = useState([]);
  // console.log(mapData)

  useEffect(() => {
    setActivityText(component.activity);
    setOriginalActivityText(component.activity);
  }, [component.activity, targetId]);
    useEffect(() => {
      if (component.festival_info){
            setFestivalPlan(component.festival_info);
      }
  }, [component.festival_info, targetId]);

  useEffect(() => {
    setLocationPlan(locationComponent);
  }, [locationComponent, targetId]);

  useEffect(() => {
    setInputMessages({});
  }, [targetId], [activityText]);

  if (component.component_type !== 'activity') {
      return null;
  }

  const handleInputMessage = (value) => {
    setInputMessages(prevMessages => ({
      ...prevMessages,
      [componentId]: value,
    }));
  };

const regexActivity = (activityText) => {
    if (activityText) {
      const regex = /(\*\*\d+일차.*?\*\*|\#\# \d+일차.*?)[\s\S]*?(?=\*\*\d+일차.*?\*\*|\#\# \d+일차.*?|$)/g;
      return activityText.match(regex) || [];
    }
    return [];
  };



  const handleReloadClick = async () => {
    if (!inputMessages[componentId] || inputMessages[componentId].trim() === "") {
      alert("빈 공란은 허용되지 않습니다.");
      return; // Early return if input is blank
    }
    const id = parseInt(targetId);
    setIsLoading(true);
    const fixedDataRequest = {
      plan_id: id,
      msg: inputMessages[componentId]
    };

    const fixedData = await SendChat(fixedDataRequest, targetId);
    setIsLoading(false);
    if (!fixedData.NewMessage) {
      alert("유효하지 않는 요청입니다.")
    } else {
      window.location.reload();
    }
  };

  const isLocationBlank = mapData.length === 0;

  const activities = regexActivity(activityText);

  return (
    <div>
      <div className="title-container">
        <p>일정</p>
      </div>
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <div className="day-plan-container" id={'plan'}>
          <div>
            {isLoading ? (
              <div style={{maxWidth:'600px'}}>
                <DayPlanLoadingScreen />
              </div>
            ) : (
              <>
                <div style={{paddingLeft:'30px', paddingRight:'30px', display:'flex', flexDirection:'column',maxWidth:'600px'}}>
                {activities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <div style={{width:'100%'}}>
                      <p className="day-plan-info">
                        <ReactMarkdown>{activity}</ReactMarkdown>
                      </p>
                    </div>


                    <div style={{display: 'flex'}}>
                      {index < activities.length && (
                        <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto', marginBottom: '20px', width: '200px' }}>
                          {/*<Link to={`/info/{id}`} className={`button-80 ${styles.sidebarLoadButton} ${styles.festivalButton}`}>*/}
                          {/*  <div style={{textAlign:'center', fontSize:'16px'}}>행사일정 보기</div>*/}
                          {/*</Link>*/}
                          {/*    <FestivalPopUp buttonText="지도보기" targetId={targetId}><MapForForm/></FestivalPopUp>*/}
                          {/*<img src="/logo.svg" alt="Logo" width="100px" height="40px"/>*/}
                          {/*<div>지도</div>*/}
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                ))}
              </div>
                <div style={{maxWidth:'600px'}}>

                  <div className="plan-text-box">
                    <InputComponent
                      id={`input_${componentId}`}
                    placeholder="수정하고 싶은 일정을 입력해주세요."
                      value={inputMessages[componentId] || ''}
                      onChange={handleInputMessage}
                    />
                    <div>
                      <ReloadButton onClick={handleReloadClick} />
                    </div>
                  </div>
                  <div style={{marginTop: '30px'}} className={'title-container'}>
                    <div><h3>지도 정보</h3></div>
                  </div>
                  <div style={{
                    marginTop: '20px',
                    paddingLeft: '30px',
                    paddingRight:'30px',maxWidth:'600px',maxHeight:'600px' }}>
                    {!isLocationBlank ? (
                      <MapInfo  targetMapId={targetId} mapDataList={mapData}></MapInfo>
                    ) : (
                        <div style={{marginTop: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column'}}>
                          <div style={{margin: 'auto'}}><img src="/construction.svg" alt="Logo" width="100px"
                                                             height="40px"/></div>
                          <h3>정보를 불러올 수가 없어요</h3>
                        </div>
                    )}
                    {/*<InternalPopUp buttonText="여행 기간에 갈 수 있는 행사가 있어요" targetId={parseInt(targetId)}/>*/}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayPlan;
