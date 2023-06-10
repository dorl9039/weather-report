"use strict";

const state = {
    increaseTempControl: null,
    decreaseTempControl: null,
    tempValue: null,
    landscape: null,
    headerCityName: null,
    cityNameInput: null,
    currentTempButton: null,
    temp: tempValue.textContent,
    skySelect: null,
    sky: null,
    cityNameReset: null,
};

const loadControls = () => {
    for (const element in state) {
        if (element !== 'temp') {
            state[element] = document.getElementById(String(element));
        }
    }
}
loadControls()

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
    state.temp++;
    state.tempValue.textContent = state.temp;
    changeTempColor(state.temp);
    changeLandscape(state.temp);
}

const decreaseTemp = () => {
    state.temp--;
    state.tempValue.textContent = state.temp;
    changeTempColor(state.temp);
    changeLandscape(state.temp);
}

const updateCity = () => {
    state.headerCityName.textContent = state.cityNameInput.value;
}

const resetCity = () => {
    state.cityNameInput.value = "Seattle";
    updateCity()
    updateTempByCity();
}

const getLatitudeLongitude = (place) => {
    return axios.get('http://127.0.0.1:5000/location', {
        params: {q: place}
    })
    .then( response => {
        const lat = response.data[0].lat;
        const lon = response.data[0].lon;
        return {lat, lon}
    })
    .catch( error => {
        console.log(error);
    })
}

const convertKToF = k => Math.round((k-273.15) * (9/5) + 32)

const getLocationWeather = (city) => {
    return getLatitudeLongitude(city)
    .then( response => {
        return axios.get('http://127.0.0.1:5000/weather', {
            params: {lat: response.lat, 
                lon: response.lon
            }
        })
        .then( response => {
            state.temp = convertKToF(response.data.main.temp);
            return state.temp;
        })
        .catch( error => {
            console.log(error);
        })
    })
}

const updateTempByCity = () => {
    getLocationWeather(state.cityNameInput.value)
    .then(temp => {
        state.tempValue.textContent = temp;
        changeTempColor(temp);
        changeLandscape(temp);
    });
}

const changeSky = () => {
    let skyGraphic;
    if (state.skySelect.value === 'sunny') {
        skyGraphic = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️";
    } else if (state.skySelect.value === 'cloudy') {
        skyGraphic = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️";
    } else if (state.skySelect.value === 'rainy') {
        skyGraphic = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧";
    } else {
        skyGraphic = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨";
    }
    state.sky.textContent = skyGraphic
}


const registerEventHandler = () => {
    state.increaseTempControl.addEventListener('click', increaseTemp);
    state.decreaseTempControl.addEventListener('click', decreaseTemp);
    state.cityNameInput.addEventListener('input', updateCity);
    state.currentTempButton.addEventListener('click', updateTempByCity);
    state.skySelect.addEventListener('change', changeSky);
    state.cityNameReset.addEventListener('click', resetCity)
}

changeSky();
changeLandscape(state.temp);
document.addEventListener('DOMContentLoaded', registerEventHandler);