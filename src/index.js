"use strict";

const state = {
    increaseTempControl: null,
    decreaseTempControl: null,
    tempValue: null,
    landscape: null,
    temp: 72
};

const loadControls = () => {
    state.increaseTempControl = document.getElementById('increaseTempControl');
    state.decreaseTempControl = document.getElementById('decreaseTempControl');
    state.tempValue = document.getElementById('tempValue');
    state.landscape = document.getElementById('landscape')
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

const changeLandscape = () => {
    let landscapeImage;
    if (state.temp >= 80) {
        landscapeImage = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    } else if (state.temp >= 70 && state.temp <= 79) {
        landscapeImage = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    } else if (state.temp >= 60 && state.temp <=69) {
        landscapeImage = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    } else {
        landscapeImage = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲'
    }
    state.landscape.textContent = landscapeImage;
}

const increaseTemp = () => {
    state.temp++;
    state.tempValue.textContent = state.temp;
    changeTempColor();
    changeLandscape();
}

const decreaseTemp = () => {
    state.temp--;
    state.tempValue.textContent = state.temp;
    changeTempColor();
    changeLandscape();
}

const registerEventHandler = () => {
    state.increaseTempControl.addEventListener('click', increaseTemp);
    state.decreaseTempControl.addEventListener('click', decreaseTemp);
}

document.addEventListener('DOMContentLoaded', registerEventHandler);