import React, {useEffect, useRef, useState} from 'react'
import dummy from '../frontDB/chatLog.json'
import './TripForm.css'
import useFetch from "../hooks/loadData.jsx";

function TripForm() {
    const chats = useFetch("http://localhost:5050/chats");

    // States to store the selected values for each option and checkbox states
    const [selectedMbti, setSelectedMbti] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [dayChecked, setDayChecked] = useState(false);
    const [personChecked, setPersonChecked] = useState(false);
    const [styleChecked, setStyleChecked] = useState(false);
    const [selectedLaunch, setSelectedLaunch] = useState(null);


    function handleMbtiOption(value) {
        setSelectedMbti(value);
    }
    function handleLaunchOption(value) {
        setSelectedLaunch(value);
    }

    function onSubmit(e) {
        e.preventDefault();
        console.log('Form submission:', selectedMbti, selectedProvince, selectedLaunch);
        console.log('Checkbox states:', dayChecked, personChecked, styleChecked);
        console.log('Data from fetch:', chats);
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
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
                <div className='sub-font'>Second Selection</div>
                <div className='second-option'>
                    {[...Array(8)].map((_, index) => (
                        <button key={index} type="button"
                                className={`option ${selectedProvince === index + 1 ? 'active' : ''}`}
                                onClick={() => setSelectedProvince(index + 1)}>{index + 1}</button>
                    ))}
                </div>

                <div className='sub-font'>Day Details</div>
                <div style={{display: 'flex', justifyContent: 'center'}} className="input_area">
                    <div className="text-box">
                        <input type="text" className="form__input" id="name-1" placeholder="Full name" required=""/>
                        <label htmlFor="name-1" className="form__label">Full Name</label>
                    </div>
                    <div style={{paddingLeft: '10px', paddingTop: '5px'}} className="checkbox-wrapper-47">
                        <input type="checkbox" name="day" id="cb-day" checked={dayChecked}
                               onChange={() => setDayChecked(!dayChecked)}/>
                        <label htmlFor="cb-day">너가 정해</label>
                    </div>
                </div>
                <div className='sub-font'>Personal Details</div>
                <div style={{display: 'flex', justifyContent: 'center'}} className="input_area">
                    <div className="text-box">
                        <input type="text" className="form__input" id="name-2" placeholder="Full name" required=""/>
                        <label htmlFor="name-1" className="form__label">Full Name</label>
                    </div>
                    <div style={{paddingLeft: '10px', paddingTop: '5px'}} className="checkbox-wrapper-47">
                        <input type="checkbox" name="person" id="cb-person" checked={personChecked}
                               onChange={() => setPersonChecked(!personChecked)}/>
                        <label htmlFor="cb-person">나 혼자 가</label>
                    </div>
                </div>

                <div className='sub-font'>Style Details</div>
                <div style={{display: 'flex', justifyContent: 'center'}} className="input_area">
                    <div className="text-box">
                        <input type="text" className="form__input" id="name-3" placeholder="Full name" required=""/>
                        <label htmlFor="name-2" className="form__label">Full Name</label>
                    </div>
                    <div style={{paddingLeft: '10px', paddingTop: '5px'}} className="checkbox-wrapper-47">
                        <input type="checkbox" name="style" id="cb-style" checked={styleChecked}
                               onChange={() => setStyleChecked(!styleChecked)}/>
                        <label htmlFor="cb-style">너가 정해</label>
                    </div>
                </div>

                <div className='sub-font'>
                    밤에 출발하는 걸 선호하시나요 아니면 낮에 출발하는걸 선호 하시나요?
                </div>
                <div className="input_area">
                    <button type="button" className={`option ${selectedLaunch === 'T' ? 'active' : ''}`}
                            onClick={() => handleLaunchOption('T')}>T (Thinking)
                    </button>
                    <button type="button" className={`option ${selectedLaunch === 'F' ? 'active' : ''}`}
                            onClick={() => handleLaunchOption('F')}>F (Feeling)
                    </button>
                </div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}


export default TripForm;