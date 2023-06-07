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
}
loadControls()

// event handling
const changeTempColor = () => {
    let cls;
    if (temp >= 80) {
        cls = 'red';
    } else if (temp >= 70 && temp <= 79) {
        cls = 'orange';
    } else if (temp >= 60 && temp <= 69) {
        cls = 'yellow';
    } else if (temp >= 50 && temp <= 59) {
        cls = 'green';
    } else {
        cls = 'teal';
    }
    state.tempValue.setAttribute('class', cls)
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