import axios from "axios"
import { useState, useEffect } from 'react'
import Display from "./components/Display"
import Filter from "./components/Filter"
import Form from "./components/Form"
import Notification from "./components/Notification"
import dataUtil from "./service/dataUtil"

const App = () => {

  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [onFilter, setOnFilter] = useState(false)
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [notification, setNotification] = useState("")
  const showPersons = onFilter ? filteredPersons : persons


  useEffect(() => {
    dataUtil.getAll()
    .then( allpeople => {
      setPersons(allpeople)
    })
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some(x => x.name === newName)) {
      if (window.confirm(`${newName} already exists, are you sure you want to replace the number`)) {
        const id = persons.find(x => x.name === newName).id
        dataUtil.update(id, {name: newName, number: newPhone})
        .then(person => {
          setPersons(persons.map(x => x.id === id ? person : x))
          setNewPhone('')
          setNewName('')
        })
        .catch((error) => {
          console.log(error)
          setNotification(error.response.data.error)
          setTimeout(() => {
            setNotification("")
          }, 3000)
        })
        
      }
    } else {
      dataUtil.add({name: newName, number: newPhone})
        .then(person => {
          setPersons(persons.concat(person))
          setNewPhone('')
          setNewName('')
          setNotification(`Succesfully added ${newName}`)
          setTimeout(() => {
            setNotification("")
          }, 3000)
        })
        .catch(error => {
          console.log(error)
          setNotification(error.response.data.error)
          setTimeout(() => {
            setNotification("")
          }, 3000)
        })
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

  const handleDelete = (id) => (e) => {
    if (window.confirm("Are you sure you want to delete")) {
        dataUtil.del(id)
        .then(r => {
            dataUtil.getAll().then((people) => {
              setPersons(people)
            })
        }).catch(() => {
            alert("Name doesn't exist")
        })
      }
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <Form newName={newName} newPhone={newPhone} handleSubmit={handleSubmit} handleChange={handleChange} setNewName={setNewName} setNewPhone={setNewPhone}/>
      <Display phonebook={showPersons} handleDelete={handleDelete}/>
    
    </div>
  )
}

export default App