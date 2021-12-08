import {useState, useEffect} from 'react'
import axios from 'axios'
import Weather from "./Weather"

const Country = ({country}) => {
  const [weather, setWeather] = useState(null)

  const languages = []
  for (const language in country.languages) {
    languages.push(country.languages[language])
  }

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [country.capital])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        capital {country.capital}
      </div>
      <div>
        population {country.population}
      </div>
      <h2>languages</h2>
      <ul>
        {languages.map(l => <li key={l}>{l}</li>)}
      </ul>
      <div>
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
      </div>
      {weather !== null ? <Weather weather={weather} /> : <></>}
    </div>
  )
}

export default Country