const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

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

router.use(checkJwt)

// AUTH0: Define an endpoint that must be called with an access token
router.get('/', checkJwt, (req, res) => {
  try {
    res.send({ msg: 'reached the /api/external endpoint :)' })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
})

module.exports = router
