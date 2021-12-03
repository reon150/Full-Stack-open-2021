const PersonForm = ({addPerson, formState, handleFormChange}) => ( 
  <div>
    <form onSubmit={addPerson}>
        <div>
          name: <input name='name' value={formState.name} onChange={handleFormChange} />
        </div>
        <div>
          number: <input name='number' value={formState.number} onChange={handleFormChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  </div>
)

export default PersonForm