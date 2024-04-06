import { createSlice } from '@reduxjs/toolkit';

// define the regex

// const operatorRegex = /((?:[0-9]+)|(?:[0-9]*\.[0-9]+))(\+|-|x|\/)((?:[0-9]+)|(?:[0-9]*\.[0-9]+))/; // check for any operator
// const timesDivideRegex = /((?:[0-9]+)|(?:[0-9]*\.[0-9]+))(x|\/)((?:[0-9]+)|(?:[0-9]*\.[0-9]+))/; // check for a times or divide
// const plusMinusRegex = /((?:[0-9]+)|(?:[0-9]*\.[0-9]+))(\+|-)((?:[0-9]+)|(?:[0-9]*\.[0-9]+))/; // check for a plus or minus

const operatorRegex = /((?:[0-9]+)|(?:[0-9]*\.[0-9]+))(\+|-|x|\/)((?:[0-9]*\.[0-9]+)|(?:[0-9]+))/; // check for any operator
const timesDivideRegex = /((?:[0-9]+)|(?:[0-9]*\.[0-9]+))(x|\/)((?:[0-9]*\.[0-9]+)|(?:[0-9]+))/; // check for a times or divide
const plusMinusRegex = /((?:[0-9]+)|(?:[0-9]*\.[0-9]+))(\+|-)((?:[0-9]*\.[0-9]+)|(?:[0-9]+))/; // check for a plus or minus

const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "x": (a, b) => a * b,
  "/": (a, b) => a / b,
};

const doTheCalc = (displayText, regex) => {

  const match = displayText.match(regex); // eg: [...]
  const expression = match[0]; // eg: "7x9"
  const a = parseFloat(match[1]); // eg: "x"
  const operator = match[2]; // eg: 7
  const b = parseFloat(match[3]); // eg: 9
  const result = operations[operator](a, b);

  return { expression, result };
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: {
    result: '',
    displayText: '0',
  },
  reducers: {
    buttonPressed: (state, action) => {
      const symbol = action.payload;
      let displayText = state.displayText;

      if (symbol === "=") {

        if (operatorRegex.test(displayText)) { // we find an operator
          let isTimesDivideComplete = false; // loop condition
          let countA = 0; // redundant counter
          let isPlusMinusComplete = false; // loop condition
          let countB = 0; // redundant counter

          while (!isTimesDivideComplete && countA < 5) { // loop over all times or divides
            if (timesDivideRegex.test(displayText)) { // we found a times or divide
              const { expression, result } = doTheCalc(displayText, timesDivideRegex); // eg: 63
              displayText = displayText.replace(expression, result) // eg: "9*7+6" => "63+6"
            } else { // we found no times or divides
              isTimesDivideComplete = true; // hence we are done
            }
            countA++; // redundant counter
          }
          
          while (!isPlusMinusComplete && countB < 5) { // loop over all plus or minus
            if (plusMinusRegex.test(displayText)) { // we found a plus or minus
              const { expression, result } = doTheCalc(displayText, plusMinusRegex); // eg: 63
              displayText = displayText.replace(expression, result) // eg: "9*7+6" => "63+6"
            } else { // we found no plus or minus
              isPlusMinusComplete = true; // hence we are done
            }
            countB++; // redundant counter
          }
          // at this point we have cleared all operators from the expression, ie evaluated it
        }

        state.displayText = ''; // clear display text
        state.result = displayText; // put result in the result section
      } else if (symbol === "c") { // we clear all content
        state.displayText = '0';
        state.result = '';
      } else { // we input a number or operator
        const newText = state.displayText === '0'? symbol : state.displayText + symbol;
        state.displayText = newText.replace(/\.+/, '.')
      }
    }
  }
  });

export const { buttonPressed } = calculatorSlice.actions;
export default calculatorSlice.reducer;