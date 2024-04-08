import { createSlice } from '@reduxjs/toolkit';

export const clockSlice = createSlice({
  name: 'clock',
  initialState: {
    timeNow: "22:37",
    sessionLength: 25,
    breakLength: 5
  },
  reducers: {
    incrementSession: (state) => {
      state.sessionLength += 1;
    },
    decrementSession: (state) => {
      state.sessionLength -= 1;
    },
    incrementBreak: (state) => {
      state.breakLength += 1;
    },
    decrementBreak: (state) => {
      state.breakLength -= 1;
    }
  }
});

export const { incrementSession, decrementSession, incrementBreak, decrementBreak } = clockSlice.actions;
export default clockSlice.reducer;