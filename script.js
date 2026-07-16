let cityInput = document.querySelector("#city");
let searchButton = document.querySelector("#search");
let weatherBox = document.querySelector("#weather");

searchButton.addEventListener("click", function () {

    let city = cityInput.value.trim();

    cityInput.value = "";

    let apiKey = "b3d03273c84ce368e0d2feb49a81ce74";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    if (city == "") {

        weatherBox.innerHTML = `
        <h3>⚠ Please enter a city name.</h3>
        `;

        return;

    }

    weatherBox.innerHTML = `
    <h3>⏳ Loading...</h3>
    `;

    fetch(url)

    .then(function (response) {

        return response.json();

    })

    .then(function (data) {

        if (data.cod == "404") {

            weatherBox.innerHTML = `
            <h3>❌ City not found.</h3>
            `;

            return;

        }

        weatherBox.innerHTML = `

        <img
        src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
        alt="Weather Icon">

        <h2>${data.name}, ${data.sys.country}</h2>

        <h1>${Math.round(data.main.temp)}°C</h1>

        <h3>${data.weather[0].main}</h3>

        <p>💧 Humidity : ${data.main.humidity}%</p>

        <p>💨 Wind : ${data.wind.speed} m/s</p>

        `;

    })

    .catch(function () {

        weatherBox.innerHTML = `
        <h3>⚠ Something went wrong.</h3>
        `;

    });

});

cityInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        searchButton.click();

    }

});