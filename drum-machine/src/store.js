import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import clickerReducer from './features/clicker/clickerSlice';
import drumkitReducer from './features/drumkit/drumkitSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    clicker: clickerReducer,
    drumkit: drumkitReducer,
  },
});