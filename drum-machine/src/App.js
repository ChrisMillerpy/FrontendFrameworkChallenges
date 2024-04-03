import logo from './logo.svg';
import './App.css';
import React from 'react';
import Counter from './features/counter/Counter';
import Clicker from './features/clicker/Clicker';
import Drumkit from './features/drumkit/Drumkit';

function DrumMachine() {
  return (
    <div className="drum-machine text-center">
      <h1>This is a drum machine</h1>
      {/* <Counter />
      <br />
      <Clicker /> */}
      <br />
      <Drumkit />
    </div>
  );
}

export default DrumMachine;