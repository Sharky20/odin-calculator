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
const opBtns = Array.from(document.querySelectorAll(".operatorButton"));

let currNum = null;
let lastNum = null;
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
    if (b == 0) {
        return "error";
    }
    return a / b;
}

function modulo(a, b) {
    return a % b;
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
        case "%":
            num = modulo(a, b);
            break;
        default: 
            return NaN;
    }
    if (num == "error") {
        return "error";
    }
    num = Math.round(num * 1000) / 1000;
    return num;
}

function clearAll() {
    currNum = null;
    lastNum = null;
    operator = "";
    display.textContent = 0;
}

posNegBtn.addEventListener("click", (e) => {
    currNum = currNum * -1;
    display.textContent = currNum;
})

numBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (currNum != null) {
            currNum = currNum * 10 + Number(button.textContent);
            display.textContent = currNum;
        }
        else {
            currNum = Number(button.textContent);
            display.textContent = currNum;
        }
    });
});

opBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (operator == "") {
            operator = button.textContent;
            lastNum = currNum;
            currNum = null;
        }
        else {
            lastNum = operate(lastNum, currNum, operator);
            if (lastNum == "error") {
                display.textContent = "error";
                clearAll();
            }
            currNum = null;
            display.textContent = lastNum;
            operator = button.textContent;
        }
    });
});

clearBtn.addEventListener("click", (e) => {
    clearAll();
});

equalBtn.addEventListener("click", (e) => {
    if (lastNum != null && operator != "") {
        lastNum = operate(lastNum, currNum, operator);
        currNum = null;
        display.textContent = lastNum;
    }
})
