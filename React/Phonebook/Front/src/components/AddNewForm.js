import React from 'react'

class AddNewForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

handleSubmit = (event) => {
  event.preventDefault()

  const name = this.props.name
  const number = this.props.number
  const persons = this.props.persons

  const names = persons.map((person) => person.name)
  if(name.length === 0) {alert("Insert name.")}
  else {
    if(names.indexOf(name) === -1) {
      const personObj = {
        name: name,
        number: number
      }
      this.props.onSubmit(personObj, 'create')
    }
    else {
      const person = persons.filter(person => person.name === name)
      const personObj = {
        name: person[0].name,
        number: number,
        id: person[0].id
      }
      this.props.onSubmit(personObj, 'update')
    }
  }
}

onNameChange = (event) => {
  this.props.onNameChange(event.target.value)
}

onNumberChange = (event) => {
  this.props.onNumberChange(event.target.value)
}

  render () {
    return (
      <div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            Nimi: <input
              value={this.props.name}
              onChange={this.onNameChange}
            />
          </div>
          <div>
            Numero: <input
              value={this.props.number}
              onChange={this.onNumberChange}
            />
          </div>
          <div>
            <button type="submit">Lisää</button>
          </div>
        </form>
      </div>
    )
  }
}

export default AddNewForm
