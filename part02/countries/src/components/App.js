import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import Countries from './Countries'

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
    setCountriesToShow(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }
  
  return (
    <div className="App">
      <Filter search={search} filterCountries={filterCountries} />
      <Countries countriesToShow={countriesToShow} filterCountries={filterCountries} />    
    </div>
  );
}

export default App;
