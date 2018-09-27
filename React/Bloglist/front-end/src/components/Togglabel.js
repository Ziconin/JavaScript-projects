import React from 'react'

export default class Togglabel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {visible: false}
  }

  toggle = () => {
    this.setState({visible: !this.state.visible})
  }

  render() {
    const hideWhenVisible = {display: this.state.visible ? 'none' : ''}
    const showWhenVisible = {display: this.state.visible ? '' : 'none'}

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={this.toggle}>{this.props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggle}>Close</button>
        </div>
      </div>
    )
  }
}
