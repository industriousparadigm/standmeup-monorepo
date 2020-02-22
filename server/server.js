const cors = require('cors')
const express = require('express')
const path = require('path')
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

// Serve React assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('build'))

  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

// Start the app
app.listen(3001, () => console.log('API listening on 3001'))
