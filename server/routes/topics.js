const express = require('express')
const Topic = require('../models/topic')
const router = express.Router()

// Get all topics
router.get('/', async (req, res) => {
  try {
    const topics = await (await Topic.find()).reverse()
    res.json(topics)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get one topic
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const topic = await Topic.findById(id)
    if (topic) res.json(topic)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Create one topic
router.post('/', async (req, res) => {
  const topic = new Topic({
    name: req.body.name
  })

  try {
    const newTopic = await topic.save()
    res.status(201).json(newTopic)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update one topic
router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req
  try {
    const topic = await Topic.findById(id)
    if (topic) await topic.updateOne(body)
    res.status(201).json(topic)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Delete one topic
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await Topic.findByIdAndDelete(id)
    if (result) res.json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
