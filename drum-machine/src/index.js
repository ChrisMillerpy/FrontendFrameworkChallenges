// React imports
import React from 'react';
import ReactDOM from 'react-dom/client';
// Component imports
import DrumMachine from './App';

// Style imports
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

// redux and react-redux imports
import store from './store';
import { Provider } from 'react-redux';

// unknown imports
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <DrumMachine />
  </Provider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
