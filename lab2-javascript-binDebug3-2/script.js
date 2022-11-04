document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
      return;
    console.log(value);
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" 
                + value + ",US&units=imperial" 
                + "&APPID=d8a36bd1a66439f75701a2df8828756c";
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json)
            let results = "";
            results += '<h2 id="todayWeather">Today&#39s Weather in ' + json.name + '</h2>';
            results += '<h2>' + json.main.temp + '&deg;F</h2>';
            for (let i = 0; i < json.weather.length; i++) {
                results += '<img id="todayImg" src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
            }
            // results += '<p>';
            // for (let i = 0; i < json.weather.length; i++) {
            //     results += json.weather[i].description;
            //     if (i !== json.weather.length - 1)
            //         results += ", ";
            // }
            // results += '</p>';
            document.getElementById("weatherResults").innerHTML = results;
        });
    const url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" 
                    + value + ", US&units=imperial" 
                    + "&APPID=d8a36bd1a66439f75701a2df8828756c";
    fetch(url2)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json);
            let forecast = "";
            for (let i = 0; i < json.list.length; i++) {
                forecast += '<div class="day data_' + moment(json.list[i].dt_txt)
                            .format('D') % 6 + '">';
                forecast += '<h2 class="date">' + moment(json.list[i].dt_txt)
                            .format('MMMM Do YYYY') + '</h2>';
                forecast += '<div class="time_block time_' + i + '">';
                forecast += '<h2 class="hour">' + moment(json.list[i].dt_txt)
                            .format('h:mm a') + '</h2>';
                forecast += '<p class="cast_temp">' + json.list[i].main.temp + '</p>';
                forecast += '<p>High: ' + json.list[i].main.temp_max + '</p>';
                forecast += '<p>Low: ' + json.list[i].main.temp_min + '</p>';
                forecast += '<p>Feels Like: ' + json.list[i].main.feels_like + '</p>';
                forecast += '<p>Wind Speed: ' + json.list[i].wind.speed + '</p>';
                forecast += '<img class="castImg" src="https://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
                // forecast += '<p class="weather_desc">';
                // for (let j = 0; j < json.list[i].weather.length; j++) {
                //     forecast += json.list[i].weather[j].description;
                //     if (j !== json.list[i].weather.length - 1)
                //         forecast += ", ";
                // }
                // forecast += '</p></div></div>';
                forecast += '</div></div>';
                // if (i % 8 === 0 && i !== 0)
                //     forecast += '</div>';
            }
            forecast += '<footer><p class="pull-left"><a href="https://github.com/BYU-CS-260/lab2-javascript-binDebug3.git" target="_blank">https://github.com/BYU-CS-260/lab2-javascript-binDebug3.git</p></a></footer>'
            document.getElementById("forecastResults").innerHTML = forecast;
        })
});
