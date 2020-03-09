// define costants 
const iconEle = document.querySelector(".weather-icon"); 
const tempEle = document.querySelector(".temp-value p"); 
const descEle = document.querySelector(".temp-descr p"); 
const locationEle = document.querySelector(".location p"); 
const notificationEle = document.querySelector(".notification"); 

//Data and constants of App
const weather = {};
weather.temp = {
    unit : "celsius"
}

const KELVIN = 273;
const key = "a6401d65ca335da04bc3bd7a494485bf"

// check for location 
if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError)
}else{
    notificationEle.style.display = "block"
    notificationEle.innerHTML= "<p>Browser dosen't support Geolocation</p>"
}

// show error msg 
function showError(error){
    notificationEle.style.display = "block"
    notificationEle.innerHTML= `<p>${error.message}</p>`
}

//Set position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude); 
}

// get weather from API 

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
 console.log(api);
 
    fetch(api)
    .then(function(response){
        let data = response.json();
        return data; 
        })
        .then(function(data){
            weather.temp.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon; 
            weather.city = data.name
            weather.country = data.sys.country ; 
        })
        .then(function(){
            displayWeather();
        });
}

function displayWeather(){
    iconEle.innerHTML= `<img src="icons/${weather.iconId}.png"/>`;
    tempEle.innerHTML= `${weather.temp.value}<span> ℃</span>`;
    descEle.innerHTML= weather.description;
    locationEle.innerHTML= `${weather.city}, ${weather.country}`
}

// conv. to feh.

function cToF (temp){
    return (temp* 9/5) + 32;
}

tempEle.addEventListener("click", function(){
    if (weather.temp.value === undefined)
    return;

    if (weather.temp.unit === "celsius"){
        let Feh = cToF(weather.temp.value);
        Feh = Math.floor(Feh);
        tempEle.innerHTML= `${Feh}<span> °F</span>`;
        weather.temp.unit = "fahrenheit"
    }else{
        tempEle.innerHTML= `${weather.temp.value}<span> ℃</span>`;
        weather.temp.unit = "celsius"
    }
});