import React, { useState, useRef, useEffect } from 'react'
import Arrow from './../../../../../Assets/images/arrow.png'
import './Countdown.scss'
import {useTranslation} from "react-i18next";

export default function Countdown({hoursMinSecs}) {
    const { t } = useTranslation();
    useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });
    const { hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;
    const [[hrs, mins, secs], setTime] = React.useState([hours, minutes, seconds]);


    const tick = () => {

        if (hrs === 0 && mins === 0 && secs === 0)
            reset()
        else if (mins === 0 && secs === 0) {
            setTime([hrs - 1, 59, 59]);
        } else if (secs === 0) {
            setTime([hrs, mins - 1, 59]);
        } else {
            setTime([hrs, mins, secs - 1]);
        }
    };

    const reset = () => setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

    return (
        <section className="countdown">
            <div className="custom_container">
                <div className="page_heading">
                    <h2>{ t('countdown-to-upcoming') }</h2>
                    <p>{ t('ready-set-play') }</p>
                </div>
                <div className='timer_countdown'>
                    <div className='time_text'><span className='line'></span><span className='line1'></span><span className='shadow'></span><span className='time_digit'></span><p>{hrs.toString().padStart(2, '0')}</p><span className='time_name'>{ t('hours') }</span> </div>
                    <div className='time_text'><span className='line'></span><span className='line1'></span><span className='shadow'></span><span className='time_digit'></span><p>{mins.toString().padStart(2, '0')}</p><span className='time_name'>{ t('minutes') }</span> </div>
                    <div className='time_text'><span className='line'></span><span className='line1'></span><span className='shadow'></span><span className='time_digit'></span><p>{secs.toString().padStart(2, '0')}</p><span className='time_name'>{ t('seconds') }</span></div>
                </div>
                <div className='arrow_img'>
                    <img src={Arrow} alt="" />
                </div>
            </div>
        </section>
    )
}
