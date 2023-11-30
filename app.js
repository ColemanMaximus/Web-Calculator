const calculatorContainer = document.querySelector(".calculator");
const screen = calculatorContainer.querySelector(".screen");

let savedNumber;
let numberHistory = [];
let usedOperator;

calculatorContainer.addEventListener("click", (e) => {
  const target = e.target;
  
  if (!target.classList.contains("btn")) {
    return;
  }

  if (isOperator(target)) {
    const operator = target.textContent;

    if (operator == "C") {
      clearScreen();
      return;
    }
    if (operator == "=" && usedOperator) {
      calculate(savedNumber, numberHistory[0], usedOperator);
      return;
    }

    if (operator == "←") {
      numberHistory.shift();
      updateScreen(numberHistory[0]);
      return;
    }

    saveOperation(numberHistory[0], operator);
    return;
  }

  appendNumber(target.textContent);
});

function isOperator(target) {
  if (target == undefined) return;
  return target.classList.contains("op");
}

function saveOperation(value, operator) {
  savedNumber = value;
  usedOperator = operator;
  numberHistory = [];
  updateScreen(0);
}

function appendNumber(value) {
  if (numberHistory.length == 0) {
    updateScreen(value)
    numberHistory.push(value);
    return;
  }

  let prenumber = numberHistory[0];
  const combined = prenumber += value;
  numberHistory.unshift(combined);
  updateScreen(combined);
}

function clearScreen() {
  screen.textContent = 0;
  numberHistory = [];
}

function addNumber(value1, value2) {
  return parseInt(value1) + parseInt(value2);
}

function minusNumber(value1, value2) {
  return parseInt(value1) - parseInt(value2);
}

function multiply(value1, value2) {
  return parseInt(value1) * parseInt(value2);
}

function divide(value1, value2) {
  return parseFloat(value1) / parseFloat(value2);
}

function updateScreen(value) {
  if (value == undefined) {
    value = 0;
  }

  screen.textContent = value;
}

function calculate(value1, value2, operator) {
  let sum;

  if (!operator) return;
  if (operator == "+") {
    sum = addNumber(value1, value2);
  } else if (operator == "-") {
    sum = minusNumber(value1, value2);
  } else if (operator == "×") {
    sum = multiply(value1, value2);  
  } else {
    sum = divide(value1, value2);
  }

  usedOperator = undefined;
  updateScreen(sum);
}
