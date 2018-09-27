import React from 'react'
import blogService from '../services/blogs'

class AddForm extends React.Component {
  constructor(props) {
    super(props)
    this.onValueChange = this.onValueChange.bind(this)
    this.submitNew = this.submitNew.bind(this)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }

  async submitNew(event) {
    event.preventDefault()
    try {
      const newBlog = await blogService
        .create({...this.state})
      this.props.onSubmit(true, newBlog)
      this.setState({
        title: '',
        author: '',
        url: ''
      })
    } catch(e) {
      console.log(e)
      this.props.onSubmit(false, null)
      this.setState({
        title: '',
        author: '',
        url: ''
      })
    }
  }

  onValueChange = (event) => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  render() {
    return (
      <div>
        <div>
          <h2>Add a new blog:</h2>
        </div>
        <form onSubmit={this.submitNew}>
          <div>
            Title: <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.onValueChange}
            />
          </div>
          <div>
            Author: <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.onValueChange}
            />
          </div>
          <div>
            Url: <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.onValueChange}
            />
          </div>
          <div>
            <button type='submit'>Add</button>
          </div>
        </form>
      </div>
    )
  }
}

export default AddForm
