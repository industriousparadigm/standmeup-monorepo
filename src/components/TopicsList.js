import React, { useState, useEffect } from 'react'
// import { Container } from 'reactstrap'
import { useAuth0 } from '../react-auth0-spa'
import TopicCard from '../components/TopicCard'
import Loading from '../components/Loading'
import { useSpring, animated } from 'react-spring'
import {
  getTopics,
  postTopic,
  patchTopic,
  removeTopic,
  archiveTopic
} from '../api/topics-api'

const TopicsList = () => {
  const [topics, setTopics] = useState(null)
  const [formData, setFormData] = useState('')
  const [showArchived, setShowArchived] = useState(false)

  useEffect(() => {
    getTopics().then(setTopics)
  }, [])

  const { loading, user } = useAuth0()

  const fade = useSpring({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  })

  const handleAdd = async e => {
    e.preventDefault()
    const newTopic = { name: formData, user: getUserObject() }
    postTopic(newTopic)
    setFormData('')
    const updatedTopics = [newTopic, ...topics]
    setTopics(updatedTopics)
  }

  const handleDelete = async topicId => {
    removeTopic(topicId)
    const updatedTopics = topics.filter(topic => topic._id !== topicId)
    setTopics(updatedTopics)
  }

  const handleArchive = async topicId => {
    archiveTopic(topicId)
    let updatedTopics = [...topics]
    updatedTopics.find(topic => topic._id === topicId).archive = true
    setTopics(updatedTopics.filter(topic => topic._id !== topicId))
  }

  const handleComplete = async topicId => {
    patchTopic(topicId, { complete: true })
    const updatedTopics = [...topics]
    updatedTopics.find(topic => topic._id === topicId).complete = true
    setTopics(updatedTopics)
  }

  const getUserObject = () => {
    const { sub, name, picture, email } = user
    return { sub, name, picture, email }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <p className='text-muted'>{user.name}</p>
      <form className='container'>
        <div className='form-row justify-content-center'>
          <div className='form-group mx-auto mb-3'>
            <label htmlFor='input-new-topic'>Add new topic</label>
            <input
              type='text'
              className='form-control'
              id='input-new-topic'
              placeholder='new topic'
              value={formData}
              onChange={e => setFormData(e.target.value)}
            />
          </div>
          <div className='form-group col-md-3'>
            <button onClick={handleAdd} className='btn btn-primary mb-2'>
              add
            </button>
          </div>
          <div className='form-group col-md-3'>
            <button
              onClick={e => {
                e.preventDefault()
                setShowArchived(!showArchived)
              }}
              className='btn btn-sm btn-primary mb-2'
            >
              {`${showArchived ? 'hide' : 'show'} archived topics`}
            </button>
          </div>
        </div>
      </form>

      {topics &&
        topics
          .filter(topic => showArchived || !topic.archived)
          .map(topic => (
            <TopicCard
              key={topic._id}
              topic={topic}
              handleComplete={handleComplete}
              handleArchive={handleArchive}
              handleDelete={handleDelete}
              style={fade}
            />
          ))}
    </>
  )
}

export default TopicsList
