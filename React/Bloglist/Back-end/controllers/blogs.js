const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})
  res.json(blogs.map(Blog.format))
})

blogRouter.post('/', async (req, res) => {
  try {
    const body = req.body
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if(!body.likes) {
      body.likes = 0
    }
    if(!body.title || !body.url) {
      return res.status(400).json({error: 'title or url missing...'})
    }
    if(!req.token || !decodedToken.id) {
      return res.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      user: user._id,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0
    })

    const result = await blog.save()
    Blog.populate(blog, {path: 'user', select: {username: 1, name: 1}})

    user.blogs = user.blogs.concat(result._id)
    await user.save()

    res.json(Blog.format(result))
  } catch (e) {
    if(e.name === 'JsonWebTokenError') {
      res.status(401).json({error: e.message})
    }
    else if (e.name === 'ValidationError') {
      res.status(400).json({error: e.message})
    } else {
      console.log(e)
      res.status(500).json({error: 'something went wrong...'})
    }
  }
})

blogRouter.delete('/:id', async (req, res) => {
  try {
    const body = req.body
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if(!req.token || !decodedToken.id) {
      return res.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)
    const blogs = user.blogs.map(blog => blog.toString())

    if(!blogs.includes(req.params.id)) {
      return res.status(400).json({error: 'wrong user'})
    }

    user.blogs = user.blogs.filter(blog => blog.id !== req.params.id)
    await user.save()

    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch(e) {
    console.log(e)
    res.status(400).json({error: 'malformatted id...'})
  }
})

blogRouter.put('/:id', async (req, res) => {
  try {
    const body = req.body
    const blog = {
      user: body.user,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    const result = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
    res.json(Blog.format(result))
  } catch(e) {
    console.log(e)
    res.status(400).json({error: 'malformatted id'})
  }
})

module.exports = blogRouter
