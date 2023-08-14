import { useState } from 'react'
import Display from "./components/Display"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [filteredPersons, setFilteredPersons] = useState([])
  const [onFilter, setOnFilter] = useState(false)
  const [filter, setFilter] = useState('')
  const showPersons = onFilter ? filteredPersons : persons

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some(x => x.name === newName)) {
      alert(`${newName} already exists`)
    } else {
      setPersons(persons.concat({name: newName, number: newPhone}))
      setNewPhone('')
      setNewName('')
    }

  }

  const handleChange = (setter) => (event) => {
    setter(event.target.value)
  }

  const handleFilter = (event) => {
    const newFilter = event.target.value
    if (newFilter === '') {
      setOnFilter(false)
    } else {
      setOnFilter(true)
      setFilteredPersons(persons.filter(person => person.name.toLowerCase().startsWith(newFilter.toLowerCase())))
    }
    setFilter(newFilter)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>Filter shown with <input value={filter} onChange={handleFilter}/></div>
      <h2>Add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input value={newName} onChange={handleChange(setNewName)}/>
        </div>
        <div>
          Phone: <input value={newPhone} onChange={handleChange(setNewPhone)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Display phonebook={showPersons}/>
    
    </div>
  )
}

export default App