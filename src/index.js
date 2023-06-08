"use strict";

const state = {
    increaseTempControl: null,
    decreaseTempControl: null,
    tempValue: null,
    landscape: null,
    headerCityName: null,
    cityNameInput: null,
    currentTempButton: null,
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

const updateCity = () => {
    state.headerCityName.textContent = state.cityNameInput.value;
}

const getLonLat = (city) => {
    let lat, lon;
    return axios.get('http://127.0.0.1:5000/location', {
        params: {q: city}
    })
    .then((response) => {
        lat = response.data[0].lat;
        lon = response.data[0].lon;
        return {lat, lon}
    })
    .catch((error) => {
        console.log(error.response.data)
    })
}

const convertKelvinToFahrenheit = k => (k-273.15) * (9/5) + 32


const getLocationWeather = () => {
    return getLonLat(state.cityNameInput.value)
    .then((response) => {
        return axios.get('http://127.0.0.1:5000/weather', {
            params: {lat: response.lat, 
                lon: response.lon}
        })
        .then((response) => {
            // console.log(response.data.main.temp)
            const tempF = convertKelvinToFahrenheit(response.data.main.temp);
            return ;
        })
    })
}

const registerEventHandler = () => {
    state.increaseTempControl.addEventListener('click', increaseTemp);
    state.decreaseTempControl.addEventListener('click', decreaseTemp);
    state.cityNameInput.addEventListener('input', updateCity);
}

document.addEventListener('DOMContentLoaded', registerEventHandler);
console.log(getLocationWeather());