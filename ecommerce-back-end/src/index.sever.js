const express = require('express')
const env = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

// routes
const userRoutes = require('./routes/user')

env.config()

// mongo connection
// mongodb+srv://admin:<password>@e-commerce-cluster.3651w.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@e-commerce-cluster.3651w.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
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
app.use('/api', userRoutes)


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

app.listen(process.env.PORT, () => {
  console.log(`Server is  running on port ${process.env.PORT}`)
})
