const Country = ({country}) => {
  const languages = []
  for (const language in country.languages) {
    languages.push(country.languages[language])
  }

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
    </div>
  )
}

export default Country