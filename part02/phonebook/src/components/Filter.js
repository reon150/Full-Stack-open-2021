const Filter = ({search, filterPhoneBook}) => ( 
  <div>
    filter shown with <input value={search} onChange={filterPhoneBook} />
  </div>
)

export default Filter