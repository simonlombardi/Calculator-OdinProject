const numbersAndOperations = document.querySelectorAll(".numbers, .operations, .dot");
const del = document.querySelector("#delete");
const display = document.querySelector(".calculator-display");
const equal = document.querySelector("#equal");
const operations = document.querySelectorAll(".operations");
let digits = "";
let operation = "";
let displayValue = "";
let prevValue = "";
let currentValue = "";

function add(a,b){
    return Number(a) + Number(b);
}

function subtract(a,b){
    return Number(a) - Number(b);
}

function multiply(a,b){
    return Number(a) * Number(b);
}

function divide(a,b){
    return (Number(a) / Number(b)).toFixed(2);
}

function operate(op,a,b){
    switch(op){
        case "+":
            add(a,b);
            break;
        case "-":
            subtract(a,b);
            break;
        case "*":
            multiply(a,b);
            break;
        case "/":
            divide(a,b);
            break;
    }
}

numbersAndOperations.forEach(btn => btn.addEventListener("click", (e) => {
    displayValue = addNumersOrOperations(e.target.textContent); 
    display.textContent = displayValue;  
}))

del.addEventListener("click", () => {
    digits = "";
    display.textContent = "";
})

function addNumersOrOperations(...n){
    if (digits.length<13){
    digits += n;
    }
    return digits;
}

operations.forEach(op => op.addEventListener("click", function(e) {
    operation = e.target.textContent;
    prevValue = displayValue.slice(0,displayValue.indexOf(operation))
}))

equal.addEventListener("click", () => {
    currentValue = displayValue.slice(displayValue.indexOf(operation)+1,)
    if (operation == "+") {
        prevValue = add(prevValue,currentValue)
        display.textContent = prevValue;
        digits = display.textContent;
    }
    else if (operation == "-" && displayValue.includes("*")) {
            prevValue = displayValue.slice(0,displayValue.indexOf("*"));
            currentValue = displayValue.slice(displayValue.indexOf("-")+1,)
            prevValue = multiply(prevValue,-currentValue);
            display.textContent = prevValue;
            digits = display.textContent;
        }
    else if (operation == "-" && !displayValue.includes("*")){
            prevValue = subtract(prevValue,currentValue)
            display.textContent = prevValue;
            digits = display.textContent;
        }

    else if (operation == "*") {
        prevValue = multiply(prevValue,currentValue)
        display.textContent = prevValue;
        digits = display.textContent;
    }
    else if (operation == "/") {
        prevValue = divide(prevValue,currentValue)
        display.textContent = prevValue;
        digits = display.textContent;
    }
})

