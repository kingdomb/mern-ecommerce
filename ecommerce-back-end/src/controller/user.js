const User = require('../models/user')

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec((error, user) => {
      if (user) {return res.status(400).json({
      message: 'User already has an account'
    })}

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
    })
}