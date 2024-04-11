import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementSession, decrementSession, incrementBreak, decrementBreak, switchMode, updateClock, setIsRunning, reset } from './clockSlice';
import pomodoroAlert from '../sounds/pomodoro-alert.mp3';

const formatToClock = (input, unit) => {
  // const tenths = Math.floor((milliseconds % (1000)) / (100));
  let minutes;
  let seconds;
  if (unit === 'milli') {
    seconds = String(Math.floor((input % (60 * 1000)) / (1000))).padStart(2, '0');
    minutes = String(Math.floor(input / (60 * 1000))).padStart(2, '0');
  } else if (unit === 'min') {
    seconds = String(Math.floor((input % 1) * 60)).padStart(2, '0');
    minutes = String(Math.floor(input)).padStart(2, '0');
  }
  
  return `${parseInt(minutes) >= 0 ? minutes : "00" }:${parseInt(seconds) >= 0 ? seconds : "00" }`;
}

const Stopwatch = () => {
  // select all the necessary parameters
  const currentMode = useSelector((state) => state.clock.currentMode);
  const sessionPercentProgress = useSelector((state) => state.clock.sessionPercentProgress);
  const breakPercentProgress = useSelector((state) => state.clock.breakPercentProgress);
  const clockTime = useSelector((state) => state.clock.clockTime);
  const isRunning = useSelector((state) => state.clock.isRunning);

  const dispatch = useDispatch();

  const clockString = formatToClock(clockTime, 'milli');

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      if (clockTime <= 0) {
        dispatch(switchMode());
      }
      intervalId = setInterval(() => {
        dispatch(updateClock());
      }, 200);
    }
    return () => clearInterval(intervalId);
  });
  
  return (
    <div className='stopwatch-container p-5 mb-2 border border-light rounded'>
      <h1 id='timer-label' className={currentMode === 'Session' ? "text-warning" : "text-info" }>{currentMode}</h1>
      <br/>
      <div className='btn-container row align-items-center justify-content-center'>
        <button id='start_stop' className='btn btn-outline-light col-2' onClick={() => dispatch(setIsRunning(!isRunning))}><i className={isRunning ? 'fa-solid fa-pause' : 'fa-solid fa-play'}></i></button>
        <div className='col-1'></div>
        <button id='reset' className='btn btn-outline-light col-2' onClick={() => dispatch(reset())}><i className='fa-solid fa-rotate-right'></i></button>
      </div>
      <br/>
      <h1 id='time-left'>{clockString}</h1>
      <audio src={pomodoroAlert} type='audio/mpeg' id='beep'></audio>
      <br/>
      <div className='progress' style={{height: "30px"}}>
        <div className='progress-bar progress-bar-striped bg-warning' role='progressbar' style={{width: `${sessionPercentProgress}%`}} aria-valuenow={sessionPercentProgress} aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <br/>
      <div className='progress' style={{height: "30px"}}>
        <div className='progress-bar progress-bar-striped bg-info' role='progressbar' style={{width: `${breakPercentProgress}%`}} aria-valuenow={breakPercentProgress} aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>
  );
};

const Inputs = () => {
  const isReset = useSelector((state) => state.clock.isReset);
  const sessionLengthMinutes = useSelector((state) => state.clock.sessionLengthMinutes);
  const breakLengthMinutes = useSelector((state) => state.clock.breakLengthMinutes)

  const sessionDecrementDisabled = sessionLengthMinutes === 1 ? "disabled" : "";
  const breakDecrementDisabled = breakLengthMinutes === 1 ? "disabled" : "";
  const sessionIncrementDisabled = sessionLengthMinutes === 60 ? "disabled" : "";
  const breakIncrementDisabled = breakLengthMinutes === 60 ? "disabled" : "";

  const disableButtonsWhenPlaying = !isReset ? "disabled" : "";

  // const breakString = formatToClock(breakLengthMinutes, 'min');
  // const sessionString = formatToClock(sessionLengthMinutes, 'min');

  const dispatch = useDispatch();

  return (
    <div className='input-container mb-2 p-5 m-0 border border-light rounded'>
      <div id='session-container' className='row mb-2 align-items-center'>
        <h4 className='col-6 m-0 p-1 border border-warning rounded' id='session-label'>Session Length: <span id='session-length'>{sessionLengthMinutes}</span></h4>
        <div className='col-1'></div>
        <button id='session-decrement' className={`btn btn-outline-warning col-2 ${sessionDecrementDisabled} ${disableButtonsWhenPlaying}`} onClick={() => dispatch(decrementSession())}><i className='fa-solid fa-angle-down'></i></button>
        <div className='col-1'></div>
        <button id='session-increment' className={`btn btn-outline-warning col-2 ${sessionIncrementDisabled} ${disableButtonsWhenPlaying}`} onClick={() => dispatch(incrementSession())}><i className='fa-solid fa-angle-up'></i></button>
      </div>
      <div id='break-container' className='row align-items-center'>
        <h4 className=' col-6 p-1 m-0 border border-info rounded' id='break-label'>Break Length: <span id='break-length'>{breakLengthMinutes}</span></h4>
        <div className='col-1'></div>
        <button id='break-decrement' className={`btn btn-outline-info col-2 ${breakDecrementDisabled} ${disableButtonsWhenPlaying}`} onClick={() => dispatch(decrementBreak())}><i className='fa-solid fa-angle-down'></i></button>
        <div className='col-1'></div>
        <button id='break-increment' className={`btn btn-outline-info col-2 ${breakIncrementDisabled} ${disableButtonsWhenPlaying}`} onClick={() => dispatch(incrementBreak())}><i className='fa-solid fa-angle-up'></i></button>
      </div>
    </div>
  );
};

export function Clock() {
  const counterArr = Array(12).fill(0);
  const counter = useSelector((state) => state.clock.counter);

  return (
    <div className='d-flex flex-column bg-dark text-light align-items-center justify-content-center bg-light' id='app-container'>
      <div id='clock-container' className='d-flex flex-column col-6'>
        <div className='row mb-3'>
          <h1 className='text-center'>Pomodoro Timer <i className="fa-solid fa-seedling"></i></h1>
        </div>
        <Inputs/>
        <Stopwatch/>
        <div className='tally-container mb-2 p-2 m-0 border border-light rounded row'>
          {counterArr.map((elt, index) => {
            let color = 'text-dark';
            if (index < counter) {
              color = 'text-success';
            }
            return (
              <div key={index} className={`col-1 ${color} p-0 m-0`}><i className='fa-solid fa-seedling'></i></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};