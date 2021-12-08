const Filter = ({search, filterCountries}) => 
  <div>find countries <input type="text" value={search} onChange={filterCountries} /></div>

export default Filter