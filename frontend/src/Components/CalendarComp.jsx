// CalendarComp.jsx

import './CalendarComp.css';
import { useEffect, useRef, useState } from "react";
import { Calendar } from "react-date-range";
import { format } from "date-fns/format";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const CalendarComp = ({ onSelect }) => {
    const [calendar, setCalendar] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setCalendar(format(new Date(), 'yyyy/MM/dd'))
        document.addEventListener("click", hideOnClick, true)
    }, [])
    const handleSelect = (date) => {
        setCalendar(format(date, 'yyyy/MM/dd'))
        onSelect(format(date, 'yyyy/MM/dd')); // Pass the selected date to the parent component
    }

    const refOne = useRef(null)
    const hideOnClick = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false);
        }
    }

    return (
        <div className='calendarWrap'>
            <input value={calendar} readOnly className="inputBox" onClick={() => setOpen(open => !open)} />
            <div ref={refOne}>
                {open &&
                    <Calendar date={new Date()} onChange={handleSelect} className="calendarElement" />
                }
            </div>
        </div>
    )
}

export default CalendarComp;
