const cors = require('cors')
const express = require('express')
const mongoConnect = require('./utils/mongo-connect')
const topicsRouter = require('./routes/topics')
const testRouter = require('./routes/test')

// Create a new Express app and add utilities
const app = express()
app.use(express.json())
app.use(cors())

// Connect to mongoDB
mongoConnect()

// Routing topics endpoints
app.use('/api/topics', topicsRouter)

// Routing test endpoints
app.use('/api/test', testRouter)

// Start the app
app.listen(3001, () => console.log('API listening on 3001'))
