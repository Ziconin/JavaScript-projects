const mongoose = require('mongoose')

/* Schemas */

const blogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, false]},
  title: String,
  author: String,
  url: String,
  likes: Number
})

/* Statics */

blogSchema.statics.format = (blog) => {
  return {
    id: blog.id,
    user: blog.user,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

/* Validators */

/* Models */

const Blog = mongoose.model('Blog', blogSchema)

/* Exports */

module.exports = Blog
