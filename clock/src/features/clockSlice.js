import { createSlice } from '@reduxjs/toolkit';

const initSessionLength = 25;
const initBreakLength = 5;

export const clockSlice = createSlice({
  name: 'clock',
  initialState: {
    sessionLengthMinutes: initSessionLength,
    breakLengthMinutes: initBreakLength,
    currentMode: 'Session',
    clockTime: initSessionLength * (60 * 1000),
    sessionPercentProgress: 0,
    breakPercentProgress: 0,
    timeAtPlay: new Date().getTime(),
    timeAtLastPause: initSessionLength * (60 * 1000),
    isRunning: false,
    isReset: true,
    counter: 0,
  },
  reducers: {
    incrementSession: (state) => {
      if (state.sessionLengthMinutes < 60) {
        state.sessionLengthMinutes += 1;
        state.clockTime = state.sessionLengthMinutes * (60 * 1000);
        state.timeAtLastPause = state.sessionLengthMinutes * (60 * 1000);
      }
    },
    decrementSession: (state) => {
      if (state.sessionLengthMinutes > 1) {
        state.sessionLengthMinutes -= 1;
        state.clockTime = state.sessionLengthMinutes * (60 * 1000);
        state.timeAtLastPause = state.sessionLengthMinutes * (60 * 1000);
      }
    },
    incrementBreak: (state) => {
      if (state.breakLengthMinutes < 60) {
        state.breakLengthMinutes += 1;
      }
    },
    decrementBreak: (state) => {
      if (state.breakLengthMinutes > 1) {
        state.breakLengthMinutes -= 1;
      }
    },
    updateClock: (state) => {
      const timeDelta = new Date().getTime() - state.timeAtPlay; // calculate the time from play press until now
      state.clockTime = state.timeAtLastPause - timeDelta; // subtract this time from the time at last pause to get a millisecond value for clock time
      if (state.currentMode === 'Session') {
        state.sessionPercentProgress = ( 1 - state.clockTime / (state.sessionLengthMinutes * (60 * 1000)) ) * 100; // set the new percent progress on session
      } else {
        state.breakPercentProgress = ( 1 - state.clockTime / (state.breakLengthMinutes * (60 * 1000)) ) * 100; // set the new percent progress on break
      }
    },
    setIsRunning: (state, action) => {
      state.isRunning = action.payload;
      if (action.payload === true) { // if we have just set the clock running
        state.timeAtPlay = new Date().getTime(); // set the time at play to now
      } else { // else we have just paused
        state.timeAtLastPause = state.clockTime; // set the time at last pause to be the current clock time
      }
      if (state.isReset) {
        state.isReset  = false;
      }
    },
    reset: (state) => {
      state.isRunning = false; // pause the clock
      state.isReset = true;
      state.counter = 0;
      state.sessionLengthMinutes = 25;
      state.breakLengthMinutes = 5;
      state.clockTime = state.sessionLengthMinutes * (60 * 1000); // reset clock time to session length
      state.currentMode = 'Session'; // set current mode to session
      state.sessionPercentProgress = 0; // reset percent progress on session and break
      state.breakPercentProgress = 0;
      state.timeAtLastPause = state.sessionLengthMinutes * (60 * 1000);
      document.getElementById('beep').pause();
      document.getElementById('beep').load();
    },
    switchMode: (state) => {
      if (state.currentMode === 'Session') {
        state.currentMode = 'Break';
        state.clockTime = state.breakLengthMinutes * (60 * 1000);
        state.sessionPercentProgress = 100;
        state.breakPercentProgress = 0;
        state.timeAtPlay = new Date().getTime();
        state.timeAtLastPause = state.breakLengthMinutes * (60 * 1000);
      } else {
        state.currentMode = 'Session';
        state.clockTime = state.sessionLengthMinutes * (60 * 1000);
        state.sessionPercentProgress = 0;
        state.breakPercentProgress = 0;
        state.timeAtPlay = new Date().getTime();
        state.timeAtLastPause = state.sessionLengthMinutes * (60 * 1000);
        if (state.counter === 12) {
          state.counter = 1;
        } else {
          state.counter += 1;
        }
      }
      document.getElementById('beep').play();
    },
  }
});

export const { incrementSession, decrementSession, incrementBreak, decrementBreak, switchMode, updateClock, setIsRunning, reset } = clockSlice.actions;
export default clockSlice.reducer;