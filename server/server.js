const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const mongoose = require('mongoose')
const topicsRouter = require('./routes/topics')

// set up process.env access
dotenv.config()

// Create a new Express app and add utilities
const app = express()
app.use(express.json())
app.use(cors())
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   )
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE')
//   next()
// })

// Connect to mongoDB
const uri = process.env.MONGO_URI
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to MongoDB database'))

// AUTH0: Define middleware that validates incoming bearer tokens
// using JWKS from dev-piqi36-y.eu.auth0.com
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithm: ['RS256']
})

// AUTH0: Define an endpoint that must be called with an access token
app.get('/api/jwt', checkJwt, (req, res) => {
  try {
    res.send({ msg: 'reached the /api/external endpoint :)' })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
})

// Routing topics endpoints
app.use('/api/topics', topicsRouter)

// Start the app
app.listen(3001, () => console.log('API listening on 3001'))
