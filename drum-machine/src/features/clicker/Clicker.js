import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementClicker1, incrementClicker2, incrementClicker3, incrementClicker4 } from './clickerSlice';

const Clicker = () => {
  const clicker1 = useSelector((state) => state.clicker.clicker1Value);
  const clicker2 = useSelector((state) => state.clicker.clicker2Value);
  const clicker3 = useSelector((state) => state.clicker.clicker3Value);
  const clicker4 = useSelector((state) => state.clicker.clicker4Value);

  const dispatch = useDispatch();

  return (
    <div className='row'>
      <div className='col'>
        <button onClick={() => dispatch(incrementClicker1())} className='btn btn-default btn-primary'>{clicker1}</button>
      </div>
      <div className='col'>
        <button onClick={() => dispatch(incrementClicker2())} className='btn btn-default btn-primary'>{clicker2}</button>
      </div>
      <div className='col'>
        <button onClick={() => dispatch(incrementClicker3())} className='btn btn-default btn-primary'>{clicker3}</button>
      </div>
      <div className='col'>
        <button onClick={() => dispatch(incrementClicker4())} className='btn btn-default btn-primary'>{clicker4}</button>
      </div>
    </div>
  );
};

export default Clicker;