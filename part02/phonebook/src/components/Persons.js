import Person from './Person';

const Persons = ({personsToShow, deletePerson}) => 
  <div>{personsToShow.map(person => <Person key={person.id} person={person} deletePerson={deletePerson} />)}</div> 

export default Persons