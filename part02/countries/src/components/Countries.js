import Country from "./Country"

const Countries = ({countriesToShow, filterCountries}) => (
  countriesToShow.length === 1 ? (
    <Country country={countriesToShow[0]} />
  ) : countriesToShow.length <= 10 ? (
    countriesToShow.map(c => 
      <div key={c.tld}>
        {c.name.common} <input type="button" value={c.name.common} onClick={filterCountries} />
      </div>)
  ) : (
    <div>Too many matches, specify another filter</div>
  )
)

export default Countries