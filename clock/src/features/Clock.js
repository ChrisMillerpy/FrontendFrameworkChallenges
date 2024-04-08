import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementSession, decrementSession, incrementBreak, decrementBreak } from './clockSlice';

export function Clock() {
  const sessionLength = useSelector((state) => state.clock.sessionLength);

  return (
    <div className='text-center'>
      <h1>This is a clock</h1>
      <p>Session Length: {sessionLength}</p>

    </div>
  );
};