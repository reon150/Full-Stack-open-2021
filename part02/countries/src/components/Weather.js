const Weather = ({weather}) => {
  const degreeToCompass = (degree) => {
    const val = Math.floor((degree / 22.5) + 0.5)
    const compass = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    return compass[(val % 16)]
  } 

  const metersPerSecondToMilesPerHours = (metersPerSecond) => Math.round(metersPerSecond * 3600 / 1609.3)

  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <div>
        <div>
          <strong>temperature: </strong> {weather.main.temp} Celcius
        </div>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
        <div>
        <strong>wind:</strong> {metersPerSecondToMilesPerHours(weather.wind.speed)} mph direction {degreeToCompass(weather.wind.deg)}
        </div>
      </div>
    </div>
  )
}

export default Weather