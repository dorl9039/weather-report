"use strict";

const state = {
    increaseTempControl: null,
    decreaseTempControl: null,
    tempValue: null,
    temp: 72
};

const loadControls = () => {
    state.increaseTempControl = document.getElementById('increaseTempControl');
    state.decreaseTempControl = document.getElementById('decreaseTempControl');
    state.tempValue = document.getElementById('tempValue')
}

loadControls()

// event handling
const changeTempColor = () => {
    if (state.temp >= 80) {
        state.tempValue.setAttribute('class', 'red');
    } else if (state.temp >= 70 && state.temp <= 79) {
        state.tempValue.setAttribute('class', 'orange');
    } else if (state.temp >= 60 && state.temp <= 69) {
        state.tempValue.setAttribute('class', 'yellow');
    } else if (state.temp >= 50 && state.temp <= 59) {
        state.tempValue.setAttribute('class', 'green');
    } else {
        state.tempValue.setAttribute('class', 'teal');
    }
}

const increaseTemp = () => {
    state.temp++;
    state.tempValue.textContent = state.temp;
    changeTempColor();
}

const decreaseTemp = () => {
    state.temp--;
    state.tempValue.textContent = state.temp;
    changeTempColor();
}

const registerEventHandler = () => {
    state.increaseTempControl.addEventListener('click', increaseTemp);
    state.decreaseTempControl.addEventListener('click', decreaseTemp);
}

document.addEventListener('DOMContentLoaded', registerEventHandler);