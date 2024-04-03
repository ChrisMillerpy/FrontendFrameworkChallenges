import { createSlice } from "@reduxjs/toolkit";

export const clickerSlice = createSlice({
  name: 'clicker',
  initialState: {
    clicker1Value: 0,
    clicker2Value: 0,
    clicker3Value: 0,
    clicker4Value: 0,
  },
  reducers: {
    incrementClicker1: (state) => {
      state.clicker1Value += 1
    }, 
    incrementClicker2: (state) => {
      state.clicker2Value += 1
    }, 
    incrementClicker3: (state) => {
      state.clicker3Value += 1
    }, 
    incrementClicker4: (state) => {
      state.clicker4Value += 1
    }
  }
});

export const { incrementClicker1, incrementClicker2, incrementClicker3, incrementClicker4 } = clickerSlice.actions;
export default clickerSlice.reducer;