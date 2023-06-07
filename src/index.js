"use strict";

const state = {
    increaseTempControl: null,
    decreaseTempControl: null,
    tempValue: null,
};
let temp = 72;

const loadControls = () => {
    for (const element in state) {
        state[element] = document.getElementById(String(element))
    }

loadControls()

// event handling
const changeTempColor = () => {
    if (temp >= 80) {
        state.tempValue.setAttribute('class', 'red');
    } else if (temp >= 70 && temp <= 79) {
        state.tempValue.setAttribute('class', 'orange');
    } else if (temp >= 60 && temp <= 69) {
        state.tempValue.setAttribute('class', 'yellow');
    } else if (temp >= 50 && temp <= 59) {
        state.tempValue.setAttribute('class', 'green');
    } else {
        state.tempValue.setAttribute('class', 'teal');
    }
}

const increaseTemp = () => {
    temp++;
    state.tempValue.textContent = temp;
    changeTempColor();
}

const decreaseTemp = () => {
    temp--;
    state.tempValue.textContent = temp;
    changeTempColor();
}

const registerEventHandler = () => {
    state.increaseTempControl.addEventListener('click', increaseTemp);
    state.decreaseTempControl.addEventListener('click', decreaseTemp);
}

document.addEventListener('DOMContentLoaded', registerEventHandler);