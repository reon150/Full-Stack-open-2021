import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import Country from './Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filterCountries = (event) => {
    setSearch(event.target.value)
    setCountriesToShow(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value)))
  }
  
  return (
    <div className="App">
      <Filter search={search} filterCountries={filterCountries} />
      {countriesToShow.length === 1 ? (
        <Country country={countriesToShow[0]} />
      ) : countriesToShow.length <= 10 ? (
        countriesToShow.map(c => <div key={c.tld}>{c.name.common}</div>)
      ) : (
        <div>Too many matches, specify another filter</div>
      )}
    </div>
  );
}

export default App;
