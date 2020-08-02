// set  const values
const calculator = {
  displayValue: '0',// you can set default value, count start at zero
  firstOperand: null,// you start with no operand like *,+ etc
  waitingForSecondOperand: false,// no wait untill u put
  operator: null,
};

// start putting our values by setting defaults values for calc
function inputDigit(digit) {// initialize our function and pass igit as the parameter
  const { displayValue, waitingForSecondOperand } = calculator;// pass two paramenters , initial count and what whe inputs

  if (waitingForSecondOperand === true) {// if at initial count
    calculator.displayValue = digit;// display zero
    calculator.waitingForSecondOperand = false;// waitingForSecondOperand  becomes false
  } else {
    calculator.displayValue =// if at initial state
      displayValue === '0' ? digit : displayValue + digit;// increment waitingForSecondOperand 
  }
}

// The inputDecimal ()
function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {// that is if we start adding values
    calculator.displayValue = '0.';
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}
// HandleOperators 
function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    const result = calculate(currentValue, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}
// calcuration 
function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
  const { target } = event;
  const { value } = target;
  if (!target.matches('button')) {
    return;
  }

  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'all-clear':
      resetCalculator();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});