import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

class BlogForm extends React.Component {

  onLikeButtonClicked = () => {
    this.props.onUpdate(this.props.blogs)
  }

  onDeleteButtonClicked = (id) => {
    const newBlogs = this.props.blogs.filter(blog => blog.id !== id)
    this.props.onUpdate(newBlogs)
  }

  render() {
    return (
      <div>
        <div>
          <h2>Blogs</h2>
          {this.props.blogs.map(blog =>
            <Blog
              key={blog.id}
              username={this.props.username}
              blog={blog}
              onLike={this.onLikeButtonClicked}
              onDelete={this.onDeleteButtonClicked}
            />
          )}
        </div>
      </div>
    )
  }
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  username: PropTypes.string
}

export default BlogForm
