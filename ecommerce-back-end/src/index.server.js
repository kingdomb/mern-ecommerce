const express = require('express')
const env = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const keys = require("../../key");


const app = express()

// routes
const authRoutes = require('./routes/auth')

env.config()

// mongo connection
// mongodb+srv://admin:<password>@e-commerce-cluster.3651w.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
  `mongodb+srv://${keys.mogodbuser.secret}:${keys.mongodbpass.secret}@e-commerce-cluster.3651w.mongodb.net/${keys.mongodbdatabase.secret}?retryWrites=true&w=majority`,
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

app.listen(keys.port.secret, () => {
  console.log(`Server is  running on port ${keys.port.secret}`)
})
