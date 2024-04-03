import { createSlice } from "@reduxjs/toolkit";

export const drumkitSlice =  createSlice({
  name: 'drumkit',
  initialState: {
    currentAudioName: '',
    currentAudioKey: '',
  },
  reducers: {
    changeAudioName: (state, action) => {
      state.currentAudioName = action.payload.name;
      state.currentAudioKey = action.payload.key;
    }
  }
});

export const { changeAudioName } = drumkitSlice.actions;
export default drumkitSlice.reducer;