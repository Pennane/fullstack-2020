const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (request, response) => {
  let users = await User.find({}).populate('blogs')
  response.json(users.map((user) => user.toJSON()))
})

router.post('/', async (request, response) => {
  const { password, username, name } = request.body

  if (!password || password.length < 3) {
    return response.status(400).send({ error: 'include a password that is atleast 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = router
