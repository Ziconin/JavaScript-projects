import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disp: ['', 'none'],
      blogVisibility: 1,
      buttonVisibility: 1
    }
  }

  toggle = () => {
    const username = this.props.blog.user.username
    const logged = this.props.username

    if(username === logged) {
      this.setState({buttonVisibility: 1 - this.state.buttonVisibility})
    }
    this.setState({blogVisibility: 1 - this.state.blogVisibility})
  }

  async onLike(blog) {
    try {
      blog.likes++
      await blogService
        .update(blog.id, blog)
      this.props.onLike()
    } catch(e) {
      console.log(e)
    }
  }

  async onDelete(blog) {
    try {
      const res = window.confirm(
        `Do you want to delete '${blog.title}' by ${blog.author}?`
      )
      if(res) {
        await blogService
          .remove(blog.id)
        this.props.onDelete(blog.id)
      }
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    const blog = this.props.blog
    const user = {...blog.user}
    return (
      <div className="blog">
        <div key={blog.id} onClick={this.toggle}>
          {blog.title} by {blog.author}
        </div>
        <div className="blogextra" style={{display: this.state.disp[this.state.blogVisibility]}}>
          {blog.url}<br />
          This blog has {blog.likes} likes<button onClick={() => this.onLike(blog)}>like</button><br />
          Added by {user.name}
          <div style={{display: this.state.disp[this.state.buttonVisibility]}}>
            <button onClick={() => this.onDelete(blog)}>Delete</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Blog
