const express = require('express')
const router = express.Router()

// AUTH0: Define middleware that validates incoming bearer tokens
// using JWKS from dev-piqi36-y.eu.auth0.com
const checkJwt = require('../middleware/jwt')

router.use(checkJwt)

// AUTH0: Define an endpoint that must be called with an access token
router.get('/', (req, res) => {
  try {
    res.send({ msg: 'reached the /api/external endpoint :)' })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
})

module.exports = router
