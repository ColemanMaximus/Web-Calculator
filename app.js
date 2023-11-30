const calculatorContainer = document.querySelector(".calculator");
const screen = calculatorContainer.querySelector(".screen");

let buffer = "0";
let savedNumber;
let usedOperator;

calculatorContainer.addEventListener("click", (e) => {
  const target = e.target;
  
  if (!target.classList.contains("btn")) {
    return;
  }

  if (isOperator(target)) {
    let operator = target.textContent;

    switch (operator) {
      case "C":
        clearScreen();
        break;
      case "=":
        calculate(savedNumber, buffer);
        break;
      case "←":
        buffer = buffer.substring(0, buffer.length - 1);
        updateScreen();
        break;
      default:
        usedOperator = operator;
        saveOperation();
        break;
    }
    return;
  }

  appendNumber(target.textContent);
});

function isOperator(target) {
  if (target == undefined) return;
  return target.classList.contains("op");
}

function saveOperation() {
  savedNumber = buffer;
  clearBuffer();
  updateScreen();
}

function appendNumber(value) {
  if (buffer === "0" && value === "0") return;
  if (buffer === "0") {
    buffer = value;
    updateScreen();
    return;
  }

  buffer += value;
  updateScreen();
}

function clearScreen() {
  clearBuffer();
  updateScreen();
}

function clearBuffer() {
  buffer = "0";
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
  return parseInt(value1) / parseInt(value2);
}

function updateScreen() {
  console.log(buffer)
  screen.textContent = buffer;
  console.log(buffer)
}

function calculate(value1, value2) {
  let sum;

  if (!usedOperator) return;
  switch (usedOperator) {
    case "+":
      sum = addNumber(value1, value2);
      break;
    case "-":
      sum = minusNumber(value1, value2);
      break;
    case "×":
      sum = multiply(value1, value2);
      break;
    case "÷":
      sum = divide(value1, value2);
      break;
  }

  usedOperator = undefined;
  buffer = sum.toString();
  updateScreen();
}