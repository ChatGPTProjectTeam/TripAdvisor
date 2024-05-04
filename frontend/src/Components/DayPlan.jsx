import React, {useEffect, useState} from 'react';
import useFetch from "../hooks/loadData.jsx";
import ReloadIcon from '../icons/reload-button-icon.svg';
import {SendChat} from "./SendChat.jsx";


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

const DayPlan = ({ component, courseId, componentId }) => {
  const [inputMessages, setInputMessages] = useState({});
  useEffect(() => {
    return () => {
      setInputMessages({});
    };
  }, [courseId]);

  // Check if the component is of type '일정' before rendering
  if (component.componentType !== '일정') {
    return null;
  }

  const { day_plan_list } = component;

  const handleInputMessage = (planId, messageNumber) => (value) => {
    setInputMessages((prevMessages) => ({
      ...prevMessages,
      [planId]: {
        ...prevMessages[planId],
        [messageNumber]: value,
      },
    }));
  };


  const handleReloadClick = async (tripId) => {
    console.log('tripId: ', tripId);
    console.log('courseId: ', courseId);
    console.log('component id: ', componentId);
    console.log('message: ', inputMessages);
    const fixedDataRequest = {
      chatId: courseId,
      componentId: componentId,
      planId: tripId,
      message: inputMessages
    };
    const fixedData = await SendChat(fixedDataRequest);
  };

  const ReloadButton = ({ onClick, tripId }) => {
    const handleClick = () => {
    onClick(tripId);
  };
    return (
      <button onClick={handleClick} className="reload-button">
        <img src={ReloadIcon} alt="Reload" width="20" height="20" />
      </button>
    );
  };
  return (
    <div>
      <div className="title-container">
        <p>일정</p>
      </div>
      {day_plan_list.map((dayPlan) => (
        <div
          key={dayPlan.planId}
          style={{ marginTop: '20px', marginBottom: '20px' }}
        >
          <div className="day-plan-container">
            <div className="day-plan-category">
              <p>{dayPlan.date}</p>
            </div>
            <div>
              <p className="day-plan-category">오전</p>
              <p className="day-plan-info">-{dayPlan.morning.activity}</p>
              <div className="plan-text-box">
                <InputComponent
                  id={`morning_${dayPlan.planId}`}
                  placeholder="Full name"
                  value={
                    inputMessages[dayPlan.planId]?.[1] || '' // Get value from state
                  }
                  onChange={handleInputMessage(dayPlan.planId, 1)}
                />
                <div>
                  <ReloadButton onClick={handleReloadClick} tripId={dayPlan.planId} />
                </div>
              </div>
              <p className="day-plan-category">오후</p>
              <p className="day-plan-info">
                -{dayPlan.afternoon.activity}
              </p>
              <div className="plan-text-box">
                <InputComponent
                  id={`afternoon_${dayPlan.planId}`}
                  placeholder="여기에 입력하세요"
                  value={
                    inputMessages[dayPlan.planId]?.[2] || '' // Get value from state
                  }
                  onChange={handleInputMessage(dayPlan.planId, 2)}
                />
                <div>
                  <ReloadButton onClick={handleReloadClick} tripId={dayPlan.planId} />
                </div>
              </div>
              <p className="day-plan-category">저녁</p>
              <p className="day-plan-info">-{dayPlan.evening.activity}</p>
              <div className="plan-text-box">
                <InputComponent
                  id={`night_${dayPlan.planId}`}
                  placeholder="여기에 입력하세요"
                  value={
                    inputMessages[dayPlan.planId]?.[3] || '' // Get value from state
                  }
                  onChange={handleInputMessage(dayPlan.planId, 3)}
                />
                <div>
                  <ReloadButton onClick={handleReloadClick} tripId={dayPlan.planId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default DayPlan;
