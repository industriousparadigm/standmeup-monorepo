// Connect to mongoDB
const mongoose = require('mongoose')

const mongoConnect = () => {
  const uri = process.env.MONGO_URI
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = mongoose.connection
  db.on('error', error => console.error(error))
  db.once('open', () => console.log('Connected to MongoDB database'))
}

module.exports = mongoConnect
