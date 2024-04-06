import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { buttonPressed } from './calculatorSlice';

const ButtonRow = (props) => {

  const dispatch = useDispatch();

  return (
    <div className='row m-0 p-0 w-100'>
      {props.symbols.map((symbol => (
        <div key={symbol} className='col p-1 m-0'>
          <button id={props.ids[props.symbols.indexOf(symbol)]} onClick={() => dispatch(buttonPressed(symbol))} className='calculator-btn btn btn-primary btn-lg' style={{borderRadius: 3}}>{symbol}</button>
        </div>
      )))}
    </div>
  );
};

const Display = (props) => {

  const dispatch = useDispatch();

  return (
    <div className='row m-0 p-0 w-100'>
      <div className='p-1 m-0 col-9'>
        <div className='d-flex flex-column justify-content-between bg-secondary py-1 px-2' style={{borderRadius: 3, height: "60px"}}>
          <p id='display' className='text-light p-0 m-0 text-end'>{props.displayText}</p>
          <p className='text-warning  p-0 m-0 text-center'>{props.result}</p>
        </div>
      </div>
      <div className='col-3 m-0 p-1'>
        <button className='btn btn-primary btn-lg calculator-btn' style={{borderRadius: 3}} id="clear" onClick={() => dispatch(buttonPressed("c"))}><i class="fa-regular fa-trash-can"></i></button>
      </div>
    </div>

  )
};

export function Calculator() {
  const result = useSelector((state) => state.calculator.result);
  const displayText = useSelector((state) => state.calculator.displayText);

  return (
    <div id='app-container' className='bg-dark text-light d-flex flex-column align-items-center justify-content-center p-5'>
      <div className='p-1 bg-light d-flex flex-column align-items-center justify-content-center' style={{borderRadius: 3}}>
        <Display displayText={displayText} result={result}/>
        <ButtonRow symbols={["7", "8", "9", "/"]} ids={["seven", "eight", "nine", "divide"]}/>
        <ButtonRow symbols={["4", "5", "6", "x"]} ids={["four", "five", "six", "multiply"]}/>
        <ButtonRow symbols={["1", "2", "3", "+"]} ids={["one", "two", "three", "add"]}/>
        <ButtonRow symbols={[".", "0", "=", "-"]} ids={["decimal", "zero", "equals", "subtract"]}/>
      </div>
    </div>
  );
}