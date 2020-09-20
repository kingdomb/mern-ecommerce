const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// user model
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  hash_password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  contactNumber: {
    type: Number,
    min: [10, 'Too few digits'],
    max: 12
  },
  profilePicture: { type: String }
}, { timestamps: true })

// setting password from CLI
userSchema.virtual('password')
  .set(function (password) {
    this.hash_password = bcrypt.hashSync(password, 10)
  })

// checking the password
userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password)
  }
}

module.exports = mongoose.model('User', userSchema)
