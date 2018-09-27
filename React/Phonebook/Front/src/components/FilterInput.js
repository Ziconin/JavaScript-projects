import React from 'react'

class FilterInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (event) => {
    this.props.onChange(event.target.value)
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <legend>{this.props.text}</legend>
        <input
          value={this.props.filter}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default FilterInput
