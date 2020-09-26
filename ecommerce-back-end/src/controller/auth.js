const User = require('../models/user')
const jwt = require('jsonwebtoken')
const keys = require('../../key')

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec((error, user) => {
      if (user) {
        return res.status(400).json({
          message: 'User already has an account'
        })
      }

      const {
        firstName,
        lastName,
        email,
        password
      } = req.body

      const _user = new User({
        firstName,
        lastName,
        email,
        password,
        username: Math.random().toString()
      })

      _user.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: 'Something went wrong'
          })
        }

        if (data) {
          return res.status(201).json({
            // user: data  (will show in Postman from POST payload)
            message: 'User created successfully..!'
          })
        }
      })
      if (error) {
        console.log(error)
      }
    })
}

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec((error, user) => {
      if (error) return res.status(400).json({ error })
      if (user) {
        if (user.authenticate(req.body.password)) {
          const token = jwt.sign({ _id: user._id }, keys.jwt.secret, { expiresIn: '1h' })
          const { firsName, lastName, email, removeListener, fulName } = user
          res.status(200).json({
            token,
            user: {
              firsName, lastName, email, removeListener, fulName
            }
          })
        } else {
          return res.status(400).json({
            message: 'Invalid Password'
          })
        }
      } else {
        return res.status(400).json({ message: 'Something went wrong!' })
      }
    })
}
