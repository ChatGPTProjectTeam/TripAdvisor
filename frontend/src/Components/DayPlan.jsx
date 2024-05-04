import React, {useEffect, useState} from 'react';
import useFetch from "../hooks/loadData.jsx";
import ReloadIcon from '../icons/reload-button-icon.svg';


const DayPlan = ({ component,courseId}) => {
    const [inputMessageOne, setInputMessageOne] = useState('');
    const [inputMessageTwo, setInputMessageTwo] = useState('');
    const [inputMessageThree, setInputMessageThree] = useState('');

    useEffect(() => {
        return () => {
            setInputMessageOne('');
            setInputMessageTwo('');
            setInputMessageThree('');
        };
    }, [courseId]);

    // Check if the component is of type '일정' before rendering
    if (component.componentType !== '일정') {
        return null;
    }

    const { day_plan_list } = component;
    function handleInputMessageOne(event) {
        setInputMessageOne(event.target.value);
        console.log(inputMessageOne)
    }
    function handleInputMessageTwo(event) {
        setInputMessageTwo(event.target.value);
        console.log(inputMessageTwo)
    }
    function handleInputMessageThree(event) {
        setInputMessageThree(event.target.value);
        console.log(inputMessageThree)
    }
    const handleReloadClick = () => {
        const data = useFetch('http://localhost:5050/form')
    }
    const ReloadButton = ({ onClick }) => {
  return (
      <button onClick={onClick} className="reload-button">
          <img src={ReloadIcon} alt="Reload" width="20" height="20"/>
      </button>
  );
    };
    return (
        <div>
            <div className='title-container'><p>일정</p></div>
            {day_plan_list.map(dayPlan => (
                <div key={dayPlan.planId} style={{marginTop:'20px',marginBottom:'20px'}}>
                    {/*<p>Plan ID: {dayPlan.planId}</p>*/}
                    <div className='day-plan-container'>
                        <div className='day-plan-category'><p>{dayPlan.date}</p></div>
                        <div>
                            <p className='day-plan-category'>오전</p>
                            <p className='day-plan-info'>-{dayPlan.morning.activity}</p>
                            <div className="plan-text-box">
                                <input type="text" className="message__input" id="morning" placeholder="Full name"
                                       value={inputMessageOne}
                                       required="" onChange={handleInputMessageOne}/>
                                <div>
                                    <ReloadButton/>
                                </div>
                            </div>
                            <p className='day-plan-category'>오후</p>
                            <p className='day-plan-info'>-{dayPlan.afternoon.activity}</p>
                            <div className="plan-text-box">
                                <input type="text" className="message__input" id="afternoon" placeholder="여기에 입력하세요"
                                       value={inputMessageTwo}
                                       required="" onChange={handleInputMessageTwo}/>

                                <div>
                                    <ReloadButton onClick={handleReloadClick} />
                                </div>
                            </div>
                            <p className='day-plan-category'>저녁</p>
                            <p className='day-plan-info'>-{dayPlan.evening.activity}</p>
                            <div className="plan-text-box">
                                <input type="text" className="message__input" id="night" placeholder="여기에 입력하세요"
                                       value={inputMessageThree}
                                       required="" onChange={handleInputMessageThree}/>

                                <div>
                                        <ReloadButton onClick={handleReloadClick} />
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
