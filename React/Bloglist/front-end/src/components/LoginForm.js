import React from 'react'
import loginService from '../services/login'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onLoginFieldChange = this.onLoginFieldChange.bind(this)
    this.state = {
      username: '',
      password: ''
    }
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      this.setState({
        username: '',
        password: ''
      })
      this.props.onSubmit(user)
    } catch(e) {
      console.log(e)
      this.setState({
        username: '',
        password: ''
      })
      this.props.onSubmit(null)

    }
  }

  onLoginFieldChange = (event) => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  render () {
    return (
      <div>
        <h2>Log in:</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.onLoginFieldChange}
            />
          </div>
          <div>
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onLoginFieldChange}
            />
          </div>
          <div>
            <button type='submit'>Log in</button>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
