import React, { useEffect, useState } from 'react';
import useFetch from "../hooks/loadData.jsx";
import ReloadIcon from '../icons/reload-button-icon.svg';
import { SendChat } from "./SendChat.jsx";
import ReactMarkdown from 'react-markdown';
import { useNavigate } from "react-router-dom";
import LoadingForChange from "./LoadingForChange.jsx";

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

  const handleReloadClick = async () => {
    const id = parseInt(targetId);
    setIsLoading(true);
    const fixedDataRequest = {
      plan_id: id,
      msg: inputMessages[componentId]
    };

    // console.log("beforeㄴㅇ: ", inputMessages[componentId]);
    const fixedData = await SendChat(fixedDataRequest, targetId);
    setIsLoading(false);
    if (fixedData && fixedData.NewMessage) {
      window.location.reload();
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
            {isLoading ? (
                <div style={{height:'300px'}}>
                  <LoadingForChange />
                </div>

            ) : (
              <>
                <p className="day-plan-info">
                  <ReactMarkdown>{activityText}</ReactMarkdown>
                </p>
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
