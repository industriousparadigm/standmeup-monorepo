const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

// Define middleware that validates incoming bearer tokens
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

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE')
  next()
})

// Define an endpoint that must be called with an access token
router.get('/', checkJwt, (req, res) => {
  try {
    res.send({ msg: 'reached the /jwt-test endpoint :)' })
  } catch (error) {
    res.status(401).json({ message: 'failed jwtoken verification' })
  }
})

module.exports = router
