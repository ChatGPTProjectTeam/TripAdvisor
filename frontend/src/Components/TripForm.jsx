import React, {useEffect, useRef, useState} from 'react'
import dummy from '../frontDB/chatLog.json'
import './TripForm.css'
import useFetch from "../hooks/loadData.jsx";
import styles from "../Sidebar.module.css";
import '../App.css';
import {CreateForm} from "./CreateForm.jsx";
import CalendarComp from "./CalendarComp.jsx";
import './CalendarComp.css';
import LoadingScreen from "./LoadingScreen.jsx";

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



    function handleDayInput(event) {
        setInputDay(event.target.value);
    }
    function handlePersonInput(event) {
        setInputPerson(event.target.value);
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

    const [selectedDate, setSelectedDate] = useState('');

    // Function to handle the selected date from CalendarComp
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        console.log(selectedDate);
    }
    function validateForm(validations) {
        for (const validation of validations) {
        if (!validation.condition) {
            alert(validation.message);
            return false;
        }
    }
    return true;
    }
    if (loading) {
        return <LoadingScreen/>
    }


    async function onSubmit(e) {
        e.preventDefault();
        if ((inputDay && dayChecked) || (inputPerson && personChecked) || (inputStyle && styleChecked)) {
            alert("Please choose either to fill in the text box or select the checkbox, not both.");
        } else {

            const validations = [
                { condition: selectedMbti, message: "MBTI를 정해주세요." },
                { condition: selectedDate || whenChecked, message: "날짜 혹은 '너가정해'중 하나를 선택하셔야 합니다." },
                { condition: selectedProvince, message: "지역 중 하나를 누르셔야 합니다." },
                { condition: inputDay || dayChecked, message: "숫자 입력 혹은 '너가 정해'를 선택하셔야 합니다." },
                { condition: inputPerson || personChecked, message: "숫자 입력 혹은 '나 혼자 가'를 선택 하셔야 합니다." },
                { condition: inputStyle || styleChecked, message: "원하시는 스타일을 입력 혹은  '너가 정해' 중 하나를 입력 혹은 선택하셔야 합니다." },
                { condition: selectedLaunch, message: "낮 혹은 밤에 출발 하는 걸 선호 하는지 선택해주세요" }
            ];
            if (!validateForm(validations)) {
                return;
            }

            console.log('Form submission:', selectedMbti, selectedDate, selectedProvince, selectedLaunch);
            console.log('first input: ', inputPerson);
            console.log('Checkbox states:', whenChecked, dayChecked, personChecked, styleChecked);
            // console.log('Data from fetch:', chats);

            const whenFilter = whenChecked ? "너가 정해" : selectedDate
            const dayFilter = dayChecked ? "너가정해" : inputDay;
            const personFilter = personChecked ? "나 혼자 가" : inputPerson;
            const styleFilter = styleChecked ? "너가 정해" : inputStyle;

            //// Place your form submission logic here if the input is valid
            const formData = {
                mbti: selectedMbti,
                province: selectedProvince,
                trip_member_num: personFilter,
                start_date: whenFilter,
                trip_style_text: styleFilter,
                days: dayFilter,

            };
            setLoading(true);
            const result = await CreateForm(formData);
            console.log('check this out brother',result);
            setLoading(false);

        }

    }

    return (
        <>
            {loading && <LoadingScreen />}
            {!loading && (
                <form onSubmit={onSubmit}>
                    <div style={{minWidth:'900px'}}>
                        <h1 style={{fontSize: '30px', paddingBottom: '10px'}}>아래의 내용들을 선택 혹은 입력해주세요</h1>
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
                        <div className='sub-font'>언제 출발하는 걸 선호 하시나요?</div>
                        <div style={{display: 'flex', justifyContent: 'center'}} className="input_area">

                            <CalendarComp onSelect={handleDateSelect}/>
                            <div style={{paddingLeft: '10px'}} className="checkbox-wrapper-47">
                                <input type="checkbox" name="when" id="cb-when" checked={whenChecked}
                                       onChange={() => setWhenChecked(!whenChecked)}/>
                                <label htmlFor="cb-when">너가 정해</label>
                            </div>
                        </div>
                        <div className='sub-font'>해당지역중 원하는 지역을 골라주시면 좀 더 나은 결과를 제공하겠습니다.</div>
                        <div className='second-option'>
                            {provinceLabels.map((label, index) => (
                                <button key={index} type="button"
                                        className={`province-option ${selectedProvince === label ? 'active' : ''}`}
                                        onClick={() => setSelectedProvince(label)}>{label}
                                </button>
                            ))}
                        </div>

                        <div className='sub-font'>총 몇박을 원하나요?</div>
                        <div style={{display: 'flex', justifyContent: 'center'}} className="input_area">
                            <div className="text-box">
                                <input type="text" className="form__input" id="name-1" placeholder="Full name"
                                       value={inputDay}
                                       required="" onChange={handleDayInput}/>
                                <label htmlFor="name-1" className="form__label" style={{fontSize: '10px'}}>숫자만 작성
                                    해주세요!</label>
                            </div>
                            <div style={{paddingLeft: '10px'}} className="checkbox-wrapper-47">
                                <input type="checkbox" name="day" id="cb-day" checked={dayChecked}
                                       onChange={() => setDayChecked(!dayChecked)}/>
                                <label htmlFor="cb-day">너가 정해</label>
                            </div>
                        </div>
                        <div className='sub-font'>누구와 가는 여행인가요?</div>
                        <div style={{display: 'flex', justifyContent: 'center'}} className="input_area">
                            <div className="text-box">
                                <input type="text" className="form__input" id="name-2" placeholder="Full name"
                                       value={inputPerson} required="" onChange={handlePersonInput}/>
                                <label htmlFor="name-1" className="form__label" style={{fontSize: '10px'}}>😏같이 갈사람
                                    없죠?</label>
                            </div>
                            <div style={{paddingLeft: '10px'}} className="checkbox-wrapper-47">
                                <input type="checkbox" name="person" id="cb-person" checked={personChecked}
                                       onChange={() => setPersonChecked(!personChecked)}/>
                                <label htmlFor="cb-person">나 혼자 가</label>
                            </div>
                        </div>

                        <div className='sub-font'>원하시는 여행 스타일이 있으신가요?</div>
                        <div style={{display: 'flex', justifyContent: 'center'}} className="input_area">
                            <div className="text-box">
                                <input type="text" className="form__input" id="name-3" placeholder="Full name"
                                       value={inputStyle} required="" onChange={handleStyleInput}/>
                                <label htmlFor="name-3" className="form__label" style={{fontSize: '10px'}}>원하시는 여행 스타일 작성
                                    부탁드려요</label>
                            </div>
                            <div style={{paddingLeft: '10px'}} className="checkbox-wrapper-47">
                                <input type="checkbox" name="style" id="cb-style" checked={styleChecked}
                                       onChange={() => setStyleChecked(!styleChecked)}/>
                                <label htmlFor="cb-style">너가 정해</label>
                            </div>
                        </div>

                        <div className='sub-font'>
                            밤에 출발하는 걸 선호하시나요 아니면 낮에 출발하는걸 선호 하시나요?
                        </div>
                        <div className="input_area">
                            <button type="button" className={`option ${selectedLaunch === '낮' ? 'active' : ''}`}
                                    onClick={() => handleLaunchOption('낮')}>낮 (Thinking)
                            </button>
                            <button type="button" className={`option ${selectedLaunch === '밤' ? 'active' : ''}`}
                                    onClick={() => handleLaunchOption('밤')}>밤 (Feeling)
                            </button>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                            <button className="button-80 submit-button" type="submit ">코스 생성</button>
                        </div>
                    </div>
                </form>
            )}
        </>

    );
}


export default TripForm;



