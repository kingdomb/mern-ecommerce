const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const keys = require('../key')
const mongodbuser = keys.mongodbuser.secret
const mongodbpass = keys.mongodbpass.secret
const mongodbdatabase = keys.mongodbdatabase.secret
const port = keys.port.secret
console.log(mongodbuser)
console.log(port)

const app = express()

// routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')

// mongo connection
// mongodb+srv://admin:<password>@e-commerce-cluster.3651w.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
  `mongodb+srv://${mongodbuser}:${mongodbpass}@e-commerce-cluster.3651w.mongodb.net/${mongodbdatabase}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
).then(() => {
  console.log('Database connected')
})

// app.use(express.json()) // activate to test server using POST
app.use(bodyParser())
app.use('/api', authRoutes)
app.use('/api', adminRoutes)

// app.get('/', (req, res, next) => {
//   res.status(200).json({
//     message: 'Hello world!'
//   })
// })

// app.post('/data', (req, res, next) => {
//   res.status(200).json({
//     message: req.body
//   })
// })

app.listen(port, () => {
  console.log(`Server is  running on port ${port}`)
})
