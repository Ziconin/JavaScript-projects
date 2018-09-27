import React from 'react';
import FilterInput from './components/FilterInput'
import AddNewForm from './components/AddNewForm'
import Display from './components/Display'
import personService from './services/persons.js'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: null
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({persons: response.data})
      })
  }

  handleFormSubmit = (personObj, call) => {
    if(call === 'create') {
      personService
        .create(personObj)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newNumber: '',
            message: 'Lisättiin ' +personObj.name
          })
          setTimeout(() => {
            this.setState({message: null})
          }, 5000)
        })
    }
    else if(call === 'update') {
      const res = window.confirm(
        personObj.name+ " on jo luettelossa, korvataanko vanha numero uudella?"
      )
      if(res) {
        personService
          .update(personObj.id, personObj)
          .then(response => {
            const persons = this.state.persons.filter(
              person => person.id !== personObj.id
            )
            this.setState({
              persons: persons.concat(response),
              newName: '',
              newNumber: '',
              message: 'Muokattiin käyttäjän '+personObj.name+' puhelinnumeroa'
            })
            setTimeout(() => {
              this.setState({message: null})
            }, 5000)
          })
          .catch(error => {
            this.setState({
              newName: '',
              newNumber: '',
              persons: this.state.persons.filter(person => person.id !== personObj.id),
              message: "Muutettavan henkilön tiedot on jo poistettu"
            })
            setTimeout(() => {
              this.setState({message: null})
            }, 5000)
          })
      }
    }

  }

  handleNameChange = (newName) => {
    this.setState({newName: newName})
  }

  handleNumberChange = (newNumber) => {
    this.setState({newNumber: newNumber})
  }

  handleFilterChange = (newFilter) => {
    this.setState({filter: newFilter})
  }

  handlePersonChange = (personId) => {
    const person = this.state.persons.filter(n => n.id === personId)
    const res = window.confirm(
      "Poistetaanko "+person[0].name+"?"
    )

    if(res) {
      personService
        .remove(personId)
        .then(() => {
          this.setState({
            persons: this.state.persons.filter(n => n.id !== personId),
            message: 'Poistettiin '+person[0].name
          })
          setTimeout(() => {
            this.setState({message: null})
          }, 5000)
        })
    }
  }

  render() {
    return (
      <div>
        <Notification message={this.state.message} />
        <FilterInput
          text="Rajaa näytettäviä: "
          value={this.state.filter}
          onChange={this.handleFilterChange}
        />
        <AddNewForm
          name={this.state.newName}
          number={this.state.newNumber}
          persons={this.state.persons}
          onNameChange={this.handleNameChange}
          onNumberChange={this.handleNumberChange}
          onSubmit={this.handleFormSubmit}
        />
        <Display
          persons={this.state.persons}
          filter={this.state.filter}
          onClick={this.handlePersonChange}
        />
      </div>
    )
  }
}

const Notification = ({message}) => {
  if(message === null) {return null}
  return (
    <div className="notif">
      {message}
    </div>
  )
}

export default App
