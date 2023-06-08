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
const changeTempColor = (temp) => {
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

const changeLandscape = (temp) => {
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
    changeTempColor(temp);
    changeLandscape(temp);
}

const decreaseTemp = () => {
    temp--;
    state.tempValue.textContent = temp;
    changeTempColor(temp);
    changeLandscape(temp);
}

const updateCity = () => {
    state.headerCityName.textContent = state.cityNameInput.value;
}

const getWeather = () => {
    axios.get('http://127.0.0.1:5000/location', {
        params: {q: state.cityNameInput.value}
    })
    .then((response) => {
        let lat = response.data[0].lat;
        let lon = response.data[0].lon;

        axios.get('http://127.0.0.1:5000/weather', {
            params: {lat: lat, lon: lon}
            })
            .then(response => {
                temp = convertKelvinToFahrenheit(response.data.main.temp);
                state.tempValue.textContent = temp;
                changeTempColor(temp);
                changeLandscape(temp);
            })
            .catch(error => {
                console.log(error);
            })
    })
    .catch((error) => {
        console.log(error);
    })
};

const convertKelvinToFahrenheit = k => Math.round((k-273.15) * (9/5) + 32)

const registerEventHandler = () => {
    state.increaseTempControl.addEventListener('click', increaseTemp);
    state.decreaseTempControl.addEventListener('click', decreaseTemp);
    state.cityNameInput.addEventListener('input', updateCity);
    state.currentTempButton.addEventListener('click', getWeather);
}

document.addEventListener('DOMContentLoaded', registerEventHandler);