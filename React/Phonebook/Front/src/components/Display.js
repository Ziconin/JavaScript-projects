import React from 'react'

class Display extends React.Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove = (id) => {
    this.props.onClick(id)
  }

  render() {
    const persons = this.props.persons
    const result = persons.filter(
      (person) => person.name.toLowerCase().startsWith(
        this.props.filter.toLowerCase()
      )
    )
    return (
      <div>
        <h2>Numerot</h2>
        <table>
          <tbody>
            {result.map(
              person => <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.number}</td>
                <td><button
                  onClick={() => this.handleRemove(person.id)}
                  >Poista</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }


}

export default Display
