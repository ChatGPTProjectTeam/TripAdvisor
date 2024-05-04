import React, {useEffect, useState} from 'react';


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
    const ReloadButton = () => {
  return (
    <svg
      width="17"
      height="19"
      viewBox="0 0 17 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.08342 8.70832H5.02996L5.03067 8.7012C5.12315 8.19503 5.30417 7.71427 5.56333 7.28649C5.94899 6.65143 6.48993 6.15374 7.12167 5.85278C7.33558 5.75145 7.55871 5.67386 7.78608 5.62241C8.25776 5.51553 8.74382 5.51553 9.2155 5.62241C9.89335 5.77765 10.5154 6.15236 11.004 6.69986L12.007 5.58203C11.555 5.07666 11.0202 4.67323 10.4317 4.39374C10.1316 4.25174 9.81957 4.14354 9.50025 4.07074C8.84138 3.92112 8.16232 3.92112 7.50346 4.07074C7.18389 4.14384 6.87163 4.2523 6.57129 4.39453C5.68625 4.8142 4.92862 5.51085 4.38962 6.40061C4.02688 7.00058 3.77321 7.6744 3.64304 8.38374C3.62321 8.49061 3.61258 8.59986 3.59841 8.70832H1.41675L4.25008 11.875L7.08342 8.70832ZM9.91675 10.2917H11.9702L11.9695 10.298C11.7844 11.3127 11.2493 12.2052 10.4799 12.7822C10.0972 13.0721 9.66704 13.2745 9.21408 13.3776C8.74265 13.4845 8.25681 13.4845 7.78537 13.3776C7.33249 13.2742 6.90233 13.0719 6.51958 12.7822C6.3316 12.6401 6.1561 12.4784 5.99541 12.2993L4.99383 13.4187C5.44611 13.924 5.98119 14.3271 6.56987 14.6062C6.87021 14.7487 7.184 14.8572 7.50133 14.9292C8.15995 15.0789 8.8388 15.0789 9.49742 14.9292C10.7671 14.6347 11.884 13.7983 12.6105 12.5978C12.9729 11.9983 13.2264 11.325 13.3564 10.6162C13.3755 10.5094 13.3869 10.4001 13.401 10.2917H15.5834L12.7501 7.12499L9.91675 10.2917Z"
        fill="#F5F5F5"
      />
    </svg>
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
                                    <ReloadButton/>
                                </div>
                            </div>
                            <p className='day-plan-category'>저녁</p>
                            <p className='day-plan-info'>-{dayPlan.evening.activity}</p>
                            <div className="plan-text-box">
                                <input type="text" className="message__input" id="night" placeholder="여기에 입력하세요"
                                       value={inputMessageThree}
                                       required="" onChange={handleInputMessageThree}/>

                                <div>
                                    <ReloadButton/>
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
