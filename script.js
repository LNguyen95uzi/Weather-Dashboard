// Javascript here
function homePage() {
    let cityEl = document.getElementById("city-input");
    let searchEl = document.getElementById("search-button");
    let nameEl = document.getElementById("city-name");
    let currentIconEl = document.getElementById("current-icon");
    let currentTempEl = document.getElementById("temperature");
    let currentHumEl = document.getElementById("humidity");
    let currentWindEl = document.getElementById("wind-speed");
    let currentUVEl = document.getElementById("uv-index");
    let historyEl = document.getElementById("history");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    // console.log(searchHistory);

    // API Key
    let APIkey = "f812bd0ab380498b5ba21900ab4d5a02";

    // Building URL needed to query database
    function weather(cityName) {


        let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIkey;

        // Run AJAX call to OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // Store retrieved data inside "response"
            .then(function (response) {
                console.log(queryURL);
                console.log(response);
            })

        searchEl.addEventListener("click", function () {
            let searchValue = cityEl.value;
            weather(searchValue);
            searchHistory.push(searchValue);
            localStorage.setItem("search", JSON.stringify(searchHistory));
            getSearchHistory();
        })

    }
    function tempF(K) {
        return Math.floor((K - 273.15) * 1.80 + 32);
    }

    function getSearchHistory() {
        historyEl.innerHTML = "";
        for (let i = 0; i < searchHistory.length; i++) {
            const historySearch = document.createElement("input");
            historySearch.setAttribute("type", "text");
            historySearch.setAttribute("readonly", true);
            historySearch.setAttribute("class", "form-control d-block bg-white");
            historySearch.setAttribute("value", searchHistory[i]);
            historySearch.addEventListener("click", function () {
                weather(historySearch.value);
            })
            historyEl.append(historySearch);
        }
    }
    getSearchHistory();
    if (searchHistory.length > 0) {
        weather(searchHistory[searchHistory.length - 1]);
    }
}
homePage();