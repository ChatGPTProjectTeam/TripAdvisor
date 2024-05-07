import React, {useEffect, useState} from 'react';
import useFetch from "../hooks/loadData.jsx";
import ReloadIcon from '../icons/reload-button-icon.svg';
import {SendChat} from "./SendChat.jsx";
import ReactMarkdown from 'react-markdown';


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

  useEffect(() => {
    setActivityText(component.activity); // Update activityText when component activity changes
  }, [component.activity, targetId]);

  if (component.component_type !== 'activity') {
    return null;
  }
  console.log("this is the component", targetId)
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
    console.log('Target ID:', targetId);
    console.log('Component ID:', componentId);
    console.log('Message:', inputMessages[componentId]);
    const fixedDataRequest = {
      trip_plan_id: targetId,
      component_id: componentId,  // Ensure you pass the component_id if needed by the backend
      message: inputMessages[componentId]
    };
    const fixedData = await SendChat(fixedDataRequest);
    console.log(fixedData);

    // Update the activity text with the response
    if (fixedData && fixedData.NewMessage) {
    const activitiesString = fixedData.NewMessage.activities.join('\n'); // Convert array to string with line breaks
    setActivityText(activitiesString); // Set activity text as string
  }
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
              {/*<ReactMarkdown>{activityText}</ReactMarkdown>*/}
            </p>  {/* Updated to use activityText from state */}
            <div className="plan-text-box">
              <InputComponent
                id={`input_${componentId}`}
                placeholder="Enter your message"
                value={inputMessages[componentId] || ''}
                onChange={handleInputMessage}
              />
              <div>
                <ReloadButton onClick={() => handleReloadClick()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default DayPlan;
