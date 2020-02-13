const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const mongoConnect = require('./utils/mongo-connect')
const topicsRouter = require('./routes/topics')
const testRouter = require('./routes/test')

// set up process.env access
dotenv.config()

// Create a new Express app and add utilities
const app = express()
app.use(express.json())
app.use(cors())

// Connect to mongoDB
mongoConnect()

// AUTH0: Define middleware that validates incoming bearer tokens
// using JWKS from dev-piqi36-y.eu.auth0.com
// WHY CAN'T I MOVE THIS SHITE TO ANOTHER FILE?? if i move checkJwt, mongoDB errors out
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
// const checkJwt = require('./middleware/jwt')

// AUTH0: Define an endpoint that must be called with an access token
app.get('/api/test', checkJwt, (req, res) => {
  try {
    res.send({ msg: 'reached the /api/external endpoint :)' })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
})

// Routing topics endpoints
app.use('/api/topics', topicsRouter)

// Routing test endpoints
// app.use('/api/test', testRouter)

// Start the app
app.listen(3001, () => console.log('API listening on 3001'))
