"use strict";

const state = {
    increaseTempControl: null,
    decreaseTempControl: null,
    tempValue: null,
    landscape: null
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

const changeLandscape = () => {
    let landscapeImage;
    if (temp >= 80) {
        landscapeImage = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    } else if (temp >= 70 && temp <= 79) {
        landscapeImage = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    } else if (temp >= 60 && temp <=69) {
        landscapeImage = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    } else {
        landscapeImage = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲'
    }
    state.landscape.textContent = landscapeImage;
}

const increaseTemp = () => {
    temp++;
    state.tempValue.textContent = temp;
    changeTempColor();
    changeLandscape();
}

const decreaseTemp = () => {
    temp--;
    state.tempValue.textContent = temp;
    changeTempColor();
    changeLandscape();
}

const registerEventHandler = () => {
    state.increaseTempControl.addEventListener('click', increaseTemp);
    state.decreaseTempControl.addEventListener('click', decreaseTemp);
}

document.addEventListener('DOMContentLoaded', registerEventHandler);