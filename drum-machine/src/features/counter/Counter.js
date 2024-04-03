import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './counterSlice';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <button className='btn btn-primary btn-default' onClick={() => dispatch(increment())}>Increment</button>
      <span>{count}</span>
      <button className='btn btn-primary btn-default' onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}

export default Counter;