import React, { useEffect, useRef, useState } from 'react';
import dummy from '../frontDB/chatLog.json';
import './TripForm.css';
import useFetch from "../hooks/loadData.jsx";
import styles from "../Sidebar.module.css";
import '../App.css';
import { CreateForm } from "./CreateForm.jsx";
import CalendarComp from "./CalendarComp.jsx";
import './CalendarComp.css';
import LoadingScreen from "./LoadingScreen.jsx";
import { useNavigate } from 'react-router-dom';

function TripForm() {
    const provinceLabels = [
        "홋카이도", "도호쿠 지방", "간사이 지방", "주코쿠 지방",
        "간토 지방", "시코쿠", "주부 지방", "규슈/오키나와"
    ];

    // States to store the selected values for each option and checkbox states
    const [selectedMbti, setSelectedMbti] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [whenChecked, setWhenChecked] = useState(false);
    const [dayChecked, setDayChecked] = useState(false);
    const [personChecked, setPersonChecked] = useState(false);
    const [styleChecked, setStyleChecked] = useState(false);
    const [selectedLaunch, setSelectedLaunch] = useState(null);
    const [inputDay, setInputDay] = useState('');
    const [inputPerson, setInputPerson] = useState('');
    const [inputStyle, setInputStyle] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        mbti: '',
        date: '',
        province: '',
        day: '',
        person: '',
        style: '',
        launch: ''
    });



    function handleDayInput(event) {
        const inputValue = event.target.value;
        if (isNaN(inputValue)) {
            setErrors(prevErrors => ({ ...prevErrors, day: 'Please enter a valid number for the number of days.' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, day: '' }));
            setInputDay(inputValue);
        }
        console.log("check error:", errors);
    }


    function handlePersonInput(event) {
        const inputValue = event.target.value;
        if (isNaN(inputValue)) {
            setErrors(prevErrors => ({ ...prevErrors, person: 'Please enter a valid number for the number of people.' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, person: '' }));
            setInputPerson(inputValue);
        }
        console.log("check error2:", errors);

    }

    function handleStyleInput(event) {
        setInputStyle(event.target.value);
    }

    function handleMbtiOption(value) {
        setSelectedMbti(value);
    }

    function handleLaunchOption(value) {
        setSelectedLaunch(value);
    }
    const handleDateSelect = (date) => {
    let selectedDate;
    if (!date) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        selectedDate = `${year}/${month}/${day}`;
    } else {
        selectedDate = date.replace("/", "-").replace("/", "-");
    }
    setSelectedDate(selectedDate);
    }

    if (loading) {
        return <LoadingScreen />
    }

    function validateForm() {
    let valid = true;
    const newErrors = {
        mbti: '',
        date: '',
        province: '',
        day: '',
        person: '',
        style: '',
        launch: ''
    };

    if (!selectedMbti) {
        newErrors.mbti = 'MBTI를 정해주세요.';
        valid = false;
    }

    if (!selectedProvince) {
        newErrors.province = '지역 중 하나를 선택해주세요.';
        valid = false;
    }

    if (!dayChecked && !inputDay) {
        newErrors.day = '날짜를 입력해주세요.';
        valid = false;
    }
    if (!personChecked && !inputPerson) {
        newErrors.person = '인원 수를 입력해 주세요.';
        valid = false;
    }
    if (!styleChecked && !inputStyle) {
        newErrors.style = '원하시는 스타일을 입력해주세요.';
        valid = false;
    }
    if (!selectedLaunch) {
            newErrors.launch = '낮 혹은 밤 중 하나를 선택해주세요.';
            valid = false;
    }

    setErrors(newErrors);
    return valid;
}

    async function onSubmit(e) {
        e.preventDefault();
        if ((inputDay && dayChecked) || (inputPerson && personChecked) || (inputStyle && styleChecked)) {
            alert("둘 중에 하나만 선택 혹은 입력 하셔야 합니다.");
        } else {
            const validation =  validateForm();
            if (!validation) {
                return;
            }

            console.log('Form submission:', selectedMbti, selectedDate, selectedProvince, selectedLaunch);
            console.log('first input: ', inputPerson);
            console.log('Checkbox states:', whenChecked, dayChecked, personChecked, styleChecked);
            // console.log('Data from fetch:', chats);

            const whenFilter = whenChecked ? '' : selectedDate
            const dayFilter = dayChecked ? '1' : inputDay;
            const personFilter = personChecked ? '1' : inputPerson;
            const styleFilter = styleChecked ? '평범한' : inputStyle;

            //// Place your form submission logic here if the input is valid
            const formData = {
                mbti: selectedMbti,
                province: `일본 ${selectedProvince}`,
                trip_member_num: personFilter,
                start_date: whenFilter,
                trip_style_text: styleFilter,
                days: dayFilter,

            };
            setLoading(true);
            const result = await CreateForm(formData);
            console.log('check this out brother', result);
            window.location.href = '/';
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <LoadingScreen />}
            {!loading && (
                <form className='formMain' onSubmit={onSubmit}>
                    <div style={{ marginTop:'90px' }}>
                        <h1 style={{ fontSize: '30px', paddingBottom: '10px' }}>아래의 내용들을 선택 혹은 입력해주세요</h1>
                        <div className='sub-font'>
                            혹시 MBTI가 T(Thinking) 혹은 F(Feeling)인가요?
                        </div>
                        <div className="input_area">
                            <button type="button" className={`option ${selectedMbti === 'T' ? 'active' : ''}`}
                                onClick={() => handleMbtiOption('T')}>T (Thinking)
                            </button>
                            <button type="button" className={`option ${selectedMbti === 'F' ? 'active' : ''}`}
                                onClick={() => handleMbtiOption('F')}>F (Feeling)
                            </button>
                        </div>
                        {errors.mbti && <div className="error">{errors.mbti}</div>}
                        <div className='sub-font'>언제 출발하는 걸 선호 하시나요?</div>
                        <div style={{ display: 'flex', justifyContent: 'center' }} className="input_area">
                            <CalendarComp onSelect={handleDateSelect} />
                        </div>
                        <div className='sub-font'>해당 지역중 원하는 지역을 골라 주시면 좀 더 나은 결과를 제공하겠습니다.</div>
                        <div className='second-option'>
                            {provinceLabels.map((label, index) => (
                                <button key={index} type="button"
                                    className={`province-option ${selectedProvince === label ? 'active' : ''}`}
                                    onClick={() => setSelectedProvince(label)}>{label}
                                </button>
                            ))}
                        </div>
                        {errors.province && <div className="error">{errors.province}</div>}
                        <div className='sub-font'>총 몇박을 원하나요?</div>
                        <div style={{ display: 'flex', justifyContent: 'center' }} className="input_area">
                            <div className="text-box">
                                <input type="text" className="form__input" id="name-1" placeholder="ex:2박 => 2"
                                    value={inputDay}
                                    required="" onChange={handleDayInput} />
                                <label htmlFor="name-1" className="form__label" style={{ fontSize: '10px' }}>숫자만 작성
                                    해주세요!</label>
                            </div>
                            <div style={{ paddingLeft: '10px' }} className="checkbox-wrapper-47">
                                <input type="checkbox" name="day" id="cb-day" checked={dayChecked}
                                    onChange={() => setDayChecked(!dayChecked)} />
                                <label htmlFor="cb-day">너가 정해</label>
                            </div>
                        </div>
                        {errors.day && <div className="error">{errors.day}</div>}
                        <div className='sub-font'>몇명이랑 가나요?</div>
                        <div style={{ display: 'flex', justifyContent: 'center' }} className="input_area">
                            <div className="text-box">
                                <input type="text" className="form__input" id="name-2" placeholder="ex:3명 => 3"
                                    value={inputPerson} required="" onChange={handlePersonInput} />
                                <label htmlFor="name-1" className="form__label" style={{ fontSize: '10px' }}>😏같이 갈사람
                                    없죠?</label>
                            </div>
                            <div style={{ paddingLeft: '10px' }} className="checkbox-wrapper-47">
                                <input type="checkbox" name="person" id="cb-person" checked={personChecked}
                                    onChange={() => setPersonChecked(!personChecked)} />
                                <label htmlFor="cb-person">나 혼자 가</label>
                            </div>
                        </div>
                        {errors.person && <div className="error">{errors.person}</div>}
                        <div className='sub-font'>원하시는 여행 스타일이 있으신가요?</div>
                        <div style={{ display: 'flex', justifyContent: 'center' }} className="input_area">
                            <div className="text-box">
                                <input type="text" className="form__input" id="name-3" placeholder="ex: 맛집 위주"
                                    value={inputStyle} required="" onChange={handleStyleInput} />
                                <label htmlFor="name-3" className="form__label" style={{ fontSize: '10px' }}>원하시는 여행 스타일 작성
                                    부탁드려요</label>
                            </div>
                            <div style={{ paddingLeft: '10px' }} className="checkbox-wrapper-47">
                                <input type="checkbox" name="style" id="cb-style" checked={styleChecked}
                                    onChange={() => setStyleChecked(!styleChecked)} />
                                <label htmlFor="cb-style">너가 정해</label>
                            </div>
                        </div>
                        {errors.style && <div className="error">{errors.style}</div>}
                        <div className='sub-font'>
                            밤에 출발하는 걸 선호하시나요 아니면 낮에 출발하는걸 선호 하시나요?
                        </div>
                        <div className="input_area">
                            <button type="button" className={`option ${selectedLaunch === '낮' ? 'active' : ''}`}
                                onClick={() => handleLaunchOption('낮')}>낮
                            </button>
                            <button type="button" className={`option ${selectedLaunch === '밤' ? 'active' : ''}`}
                                onClick={() => handleLaunchOption('밤')}>밤
                            </button>
                        </div>
                        {errors.launch && <div className="error">{errors.launch}</div>}
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                            <button className="button-80 submit-button" type="submit ">코스 생성</button>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
}

export default TripForm;
