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
const increaseTemp = () => {
    state.temp++;
    state.tempValue.textContent = state.temp;
}

const decreaseTemp = () => {
    state.temp--;
    state.tempValue.textContent = state.temp;
}

const registerEventHandler = () => {
    state.increaseTempControl.addEventListener('click', increaseTemp);
    state.decreaseTempControl.addEventListener('click', decreaseTemp);
}

document.addEventListener('DOMContentLoaded', registerEventHandler);