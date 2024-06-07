import React, { useEffect, useState } from 'react';
import useFetch from "../hooks/loadData.jsx";
import ReloadIcon from '../icons/reload-button-icon.svg';
import { SendChat } from "./SendChat.jsx";
import ReactMarkdown from 'react-markdown';
import {Link, useNavigate} from "react-router-dom";
import LoadingForChange from "./LoadingForChange.jsx";
import PopUp from "./PopUp.jsx";
import styles from "../Sidebar.module.css";
import DayPlanLoadingScreen from "./DayPlanLoadingScreen.jsx";

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
    <button onClick={onClick} className="reload-button" style={{ border: 'none', background: 'none', color:'black'}}>
      <img src={ReloadIcon} alt="Reload" style={{ width: 20, height: 20 }} />
    </button>
  );
};

const DayPlan = ({ component, targetId, componentId }) => {
  const [inputMessages, setInputMessages] = useState({});
  const [activityText, setActivityText] = useState(component.activity);
  const [originalActivityText, setOriginalActivityText] = useState(component.activity);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setActivityText(component.activity);
    setOriginalActivityText(component.activity);
  }, [component.activity, targetId]);

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

  const activities = regexActivity(activityText);

  return (
    <div>
      <div className="title-container">
        <p>일정</p>
      </div>
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <div className="day-plan-container">
          <div>
            {isLoading ? (
              <div>
                <DayPlanLoadingScreen/>
              </div>
            ) : (
              <>
                {activities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <p className="day-plan-info">
                      <ReactMarkdown>{activity}</ReactMarkdown>
                    </p>
                    {/*{index < activities.length &&*/}
                    {/*    <div style={{display:'flex', margin:'auto',marginBottom: '20px', width:'200px'}}>*/}
                    {/*      <Link to={`/info/{id}`} className={`button-80 ${styles.sidebarLoadButton}`}>*/}
                    {/*        <div style={{textAlign:'center'}}>행사일정 보기</div>*/}
                    {/*      </Link>*/}
                    {/*    </div>}*/}
                  </React.Fragment>
                ))}
                <div className="plan-text-box">
                  <InputComponent
                    id={`input_${componentId}`}
                    placeholder="Enter your message"
                    value={inputMessages[componentId] || ''}
                    onChange={handleInputMessage}
                  />
                  <div>
                    <ReloadButton onClick={handleReloadClick} />
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
