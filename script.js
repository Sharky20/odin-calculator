const numBtns = Array.from(document.querySelectorAll(".numButton:not(#float)"));
const clearBtn = document.querySelector("#clear");
const posNegBtn = document.querySelector("#posNeg");
const modBtn = document.querySelector("#modulo");
const divideBtn = document.querySelector("#divide");
const multBtn = document.querySelector("#multiply");
const subBtn = document.querySelector("#subtract");
const addBtn = document.querySelector("#add");
const equalBtn = document.querySelector("#equal");
const floatBtn = document.querySelector("#float");
const display = document.querySelector(".display");

let a = 0;
let b = 0;
let operator = "";

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    let num;
    switch (operator) {
        case "+": 
            num = add(a, b);
            break;
        case "-": 
            num = subtract(a,b);
            break;
        case "*": 
            num = multiply(a, b);
            break;
        case "/": 
            num = divide(a, b);
            break;
        default: 
            return NaN;
    }
    num = Math.round(num * 1000) / 1000;
    return num;
}

numBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
        display.textContent = button.textContent;
    })
})
