import React, {useEffect, useState} from 'react';
import useFetch from "../hooks/loadData.jsx";
import ReloadIcon from '../icons/reload-button-icon.svg';
import {SendChat} from "./SendChat.jsx";
import ReactMarkdown from 'react-markdown';
import {useNavigate} from "react-router-dom";



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
    <button onClick={onClick} className="reload-button" style={{ border: 'none', background: 'none' }}>
      <img src={ReloadIcon} alt="Reload" style={{ width: 20, height: 20 }} />
    </button>
  );
};

const DayPlan = ({ component, targetId, componentId }) => {
  const [inputMessages, setInputMessages] = useState({});
  const [activityText, setActivityText] = useState(component.activity);  // State to manage the activity text
  const [originalActivityText, setOriginalActivityText] = useState(component.activity); // State to store the original activity text
  const navigate = useNavigate();

  useEffect(() => {
    setActivityText(component.activity); // Update activityText when component activity changes
    setOriginalActivityText(component.activity); // Update original activity text
  }, [component.activity, targetId]);

  useEffect(() => {
    setInputMessages({}); // Clear input messages when targetId changes
  }, [targetId]);

  if (component.component_type !== 'activity') {
    return null;
  }

  const handleInputMessage = (value) => {
    setInputMessages(prevMessages => ({
      ...prevMessages,
      [componentId]: value,
    }));
  };

  const formatTextWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const handleReloadClick = async () => {
    const fixedDataRequest = {
      trip_plan_id: targetId,
      component_id: componentId,
      message: inputMessages[componentId]
    };
    const fixedData = await SendChat(fixedDataRequest, targetId);

    if (fixedData && fixedData.NewMessage) {
      navigate(`/chat/${targetId}`);
    }


    // if (fixedData && fixedData.NewMessage) {
    //   const activitiesString = fixedData.NewMessage.activities.join('\n'); // Convert array to string with line breaks
    //   // Only update activity text if it's different from the original
    //   if (activitiesString !== originalActivityText) {
    //     setActivityText(activitiesString); // Set activity text as string
    //     setOriginalActivityText(activitiesString); // Update original activity text
    //   }
    // }
  };

  return (
    <div>
      <div className="title-container">
        <p>일정</p>
      </div>
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <div className="day-plan-container">
          <div>
            <p className="day-plan-info">
              {formatTextWithLineBreaks(activityText)}
            </p>
            {/*<div className="plan-text-box">*/}
            {/*  <InputComponent*/}
            {/*    id={`input_${componentId}`}*/}
            {/*    placeholder="Enter your message"*/}
            {/*    value={inputMessages[componentId] || ''}*/}
            {/*    onChange={handleInputMessage}*/}
            {/*  />*/}
            {/*  <div>*/}
            {/*    <ReloadButton onClick={handleReloadClick} />*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </div>
  );
};


export default DayPlan;
