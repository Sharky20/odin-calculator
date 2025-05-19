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
const funcBtns = Array.from(document.querySelectorAll(".funcButton"));

let currNum = null;
let lastNum = null;
let operator = "";
let floatMode = false;
let floatValue = 0.1;

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
    floatMode = false;
    floatValue = 0.1;
    display.textContent = 0;
}

posNegBtn.addEventListener("click", () => {
    if (currNum != null) {
        currNum = currNum * -1;
        display.textContent = currNum;
    }
});

numBtns.forEach((button) => {
    button.addEventListener("click", () => {
        if (currNum != null) {
            if (floatMode == false) {
                currNum = currNum * 10 + Number(button.textContent);
            }
            else {
                currNum = currNum + Number(button.textContent) * floatValue;
                floatValue /= 10;
                currNum = Math.round(currNum * 1000) / 1000;
            }
            display.textContent = currNum;
        }
        else {
            if (floatMode) {
                currNum = Number(button.textContent) * floatValue;
                floatValue /= 10;
            }
            else {
                currNum = Number(button.textContent);
            }
            display.textContent = currNum;
        }
        if (operator == "") {
            lastNum = null;
        }
    });
});

opBtns.forEach((button) => {
    button.addEventListener("click", () => {
        if (currNum != null && lastNum != null && operator != "") {
            result = operate(lastNum, currNum, operator);
            operator = button.textContent;
            display.textContent = result;
            lastNum = result;
            currNum = null;
            floatMode = false;
            floatValue = 0.1;
        }
        else if (operator == "" && currNum != null) {
            operator = button.textContent;
            lastNum = currNum;
            floatMode = false;
            floatValue = 0.1;
            currNum = null;
        }
        else if (currNum === null) {
            operator = button.textContent;
            floatMode = false;
            floatValue = 0.1;
        }
        else {
            lastNum = operate(lastNum, currNum, operator);
            floatMode = false;
            floatValue = 0.1;
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

floatBtn.addEventListener("click", () => {
    floatMode = true;
});

clearBtn.addEventListener("click", () => {
    clearAll();
});

equalBtn.addEventListener("click", () => {
    if (lastNum != null && operator != "" && currNum != null) {
        lastNum = operate(lastNum, currNum, operator);
        currNum = null;
        floatMode = false;
        floatValue = 0.1;
        operator = "";
        display.textContent = lastNum;
    }
});

window.addEventListener("keypress", (e) => {
    if (e.key >= 0 && e.key <= 9) {
        numBtns.find((btn) => btn.textContent == e.key).dispatchEvent(new Event("click"));
    }
    else if ("%+-*/=".includes(e.key)) {
        funcBtns.find((btn) => btn.textContent == e.key).dispatchEvent(new Event("click"));
    }
    else if (e.key === ".") {
        floatBtn.dispatchEvent(new Event("click"));
    }
    else if (e.key === "Enter") {
        equalBtn.dispatchEvent(new Event("click"));
    }
    else if (e.key === "!") {
        posNegBtn.dispatchEvent(new Event("click"));
    }
    else if (e.key === "c") {
        clearAll();
    }
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        clearAll();
    }
});