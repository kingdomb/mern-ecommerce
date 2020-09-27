const User = require('../models/user')
const jwt = require('jsonwebtoken')
const keys = require('../../key')
const jwtSecret = keys.jwt.secret
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec((error, user) => {
      if (user) {
        return res.status(400).json({
          message: 'There is an account already associated with this email'
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
          const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '1h' })
          const { _id, firsName, lastName, email, role, fullName } = user
          res.status(200).json({
            token,
            user: { _id, firsName, lastName, email, role, fullName }
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

exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  // console.log(token)
  const user = jwt.verify(token, jwtSecret)
  req.user = user
  next()
}
