const api = {
    key: "be118330594b4a0c8f000951211708",
    base: "https://api.weatherapi.com/v1/current.json?key=be118330594b4a0c8f000951211708"

}

const api2 = {
    key: "be118330594b4a0c8f000951211708",
    base: "https://api.weatherapi.com/v1/forecast.json?key=be118330594b4a0c8f000951211708"

}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);

function setQuery(event) {
    //if (`KeyboardEvent: key= 'Enter' | code='Enter'`) {
    if (event.keyCode == 13)  {
        getResults(searchbox.value);
    }
} 

function getResults (query) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=be118330594b4a0c8f000951211708&q=${query}`)
        .then(current => {
            return current.json();
        })
        .then(displayResults);
    }

function displayResults(current) {
    console.log(current)
    let city = document.querySelector('.location .city');
    city.innerText = `${current.location.name}, ${current.location.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${current.current.temp_c}<span>°c</span>`;

    let weatherEl = document.querySelector('.current .weather');
    weatherEl.innerHTML = `${current.current.condition.text}`;

    let feelsLike = document.querySelector('.current .feels-like');
    feelsLike.innerText = `Feels like: ${current.current.feelslike_c}`;

} 

function forecastResults (query) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=be118330594b4a0c8f000951211708&q=${query}`)
        .then(forecast => {
            return forecast.json();
        })
        .then(forecastResults);
    }

function displayResults2(forecast) {
        console.log(forecast)
        
        let weather_el = document.querySelector('.current .weather');
        weather_el.innerText = current.text;
    
        let hilow = document.querySelector('.current .hi-low');
        hilow.innerText = `${Math.round(forecast.forecastday.day.mintemp_c)}°c/ ${Math.round(forecast.forecastday.day.maxtemp_c)}°c`;
    } 

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}