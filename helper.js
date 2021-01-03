// Helpers //

const createVenueHTML = (name, location, iconSource, photo, vid, venueType, address, city) => {
  const cityGuide = $('#city-guide').attr({'href':'https://foursquare.com/explore?mode=url&near=' + city, 'target':'_blank'});

    return `<h4 class="venue-name">${name}</h4>
    <img class="venueimage" src="${photo}"/>
    <img class="venueicon" src="${iconSource}"/>
    <p><strong>Category:</strong> ${venueType}</p>
    <p class="address"><strong>Address:</strong><br>${address}</p><br>`;
  }
  
  const createWeatherHTML = (currentDay) => {
    console.log(currentDay)

    return `<div class="table-div"><table>
    <tr><th class="cw" colspan="2">Current Weather</th></tr>
    <tr><th colspan="2"><h4>${currentDay.name}, ${currentDay.sys.country}</h4></th></tr>
      <tr><td colspan="2"><h4 class="day">${weekDays[(new Date()).getDay()]} ${new Date().getDate()} ${months[(new Date()).getMonth()]} ${new Date().getFullYear()}</h4></td></tr>
      <tr><td colspan="2" class="hd">Current Temperature:</td></tr>
      <tr><td colspan="2"><h1>${kelvinToCelsius(currentDay.main.temp)}&deg;C&nbsp;&nbsp;|&nbsp;&nbsp;${kelvinToFahrenheit(currentDay.main.temp)}&deg;F</h1></td></tr>
      <tr>
      <th class="w-icon" colspan="2"><img id="w-icon" src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png"></th>
      </tr>
      <tr>
        <td class="hd">Condition:</td>
        <td class="hd"><p>${currentDay.weather[0].description}</p></td>
      </tr>
    <tr>
      <td class="hd">Feels like: </td>
      <td class="hd">
      <p>${kelvinToCelsius(currentDay.main.feels_like)}&deg;C&nbsp;&nbsp;|&nbsp;&nbsp;${kelvinToFahrenheit(currentDay.main.feels_like)}&deg;F</p>
      </td>
    </tr>
    <tr>
      <td class="hd">Maximum Temp:</td>
      <td class="hd"><p>${kelvinToCelsius(currentDay.main.temp_max)}&deg;C&nbsp;&nbsp;|&nbsp;&nbsp;${kelvinToFahrenheit(currentDay.main.temp_max)}&deg;F</p></td>
    </tr>
    <tr>
      <td class="hd">Minimum Temp:</td>
      <td class="hd"><p>${kelvinToCelsius(currentDay.main.temp_min)}&deg;C&nbsp;&nbsp;|&nbsp;&nbsp;${kelvinToFahrenheit(currentDay.main.temp_min)}&deg;F</p></td>
    </tr>
    <tr>
        <td class="hd">Humidity:</td>
        <td class="hd"><p>${currentDay.main.humidity}%</p></td>
    </tr>
    <tr>
        <td class="hd">Wind Speed:</td>
        <td class="hd"><p>${currentDay.wind.speed} m/s</p></td>
    </tr>
  </table>
  </div>
  <div class="w-logo"><p>Powered by &nbsp;&nbsp; <img class="logo" src="/media/OpenWeather-Logo.svg" alt="OpenWeather API"></p></div>`;               
  }

  const kelvinToCelsius = k => (k - 273.15).toFixed(0);
  const kelvinToFahrenheit = k => ((k - 273.15) * 9 / 5 + 32).toFixed(0);


// Return key function //
