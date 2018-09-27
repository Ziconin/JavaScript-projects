const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('blogs', {title: 1, author: 1, likes: 1})
  res.json(users.map(User.format))
})

userRouter.post('/', async (req, res) => {
  try {
    const body = req.body

    const isUnique = await User.find({username: body.username})
    if(isUnique.length) {
      return res.status(400).json({error: 'username must be unique'})
    }
    if(body.password.length < 3) {
      return res.status(400).json({error: 'password has to be over three characters'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      adult: body.adult || true
    })

    const savedUser = await user.save()

    res.json(User.format(savedUser))
  } catch (e) {
    console.log(e)
    res.status(500).json({error: 'something went wrong...'})
  }
})

module.exports = userRouter
