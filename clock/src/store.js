import { configureStore } from '@reduxjs/toolkit';
import clockReducer from './features/clockSlice';

export default configureStore({
  reducer: {
    clock: clockReducer
  }
});