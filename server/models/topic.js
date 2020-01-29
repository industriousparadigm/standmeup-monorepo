const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  complete: { type: Boolean, required: true, default: false },
  user: {
    sub: { type: String, required: true },
    name: { type: String },
    email: { type: String },
    picture: { type: String }
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Topic', topicSchema)
