import React, { useState, useEffect } from 'react'
// import { Container } from 'reactstrap'
import { useAuth0 } from '../react-auth0-spa'
import TopicCard from '../components/TopicCard'
import Loading from '../components/Loading'
import { useTrail, animated } from 'react-spring'
import {
  getTopics,
  createTopic,
  patchTopic,
  deleteTopic
} from '../api/topics-api'

const Topics = () => {
  const [topics, setTopics] = useState([])
  const [relevantTopics, setRelevantTopics] = useState([])
  const [formData, setFormData] = useState('')
  const [showArchived, setShowArchived] = useState(false)

  useEffect(() => {
    getTopics().then(setTopics)
  }, [])

  useEffect(() => {
    topics.length > 0 &&
      setRelevantTopics(
        showArchived
          ? topics
          : topics.filter(topic => showArchived || !topic.archived)
      )
  }, [showArchived, topics])

  const trail = useTrail(relevantTopics.length, {
    from: { opacity: 0 },
    to: { opacity: 1 }
  })

  const { loading, user } = useAuth0()

  const handleAdd = async e => {
    e.preventDefault()
    if (!user) return
    const newTopic = await createTopic({
      name: formData,
      user: getUserObject()
    })
    setFormData('')
    const updatedTopics = [newTopic, ...topics]
    setTopics(updatedTopics)
  }

  const handleDelete = async topicId => {
    deleteTopic(topicId)
    const updatedTopics = topics.filter(topic => topic._id !== topicId)
    setTopics(updatedTopics)
  }

  const handleArchive = async topicId => {
    patchTopic(topicId, { archived: true })
    const updatedTopics = [...topics]
    updatedTopics.find(topic => topic._id === topicId).archived = true
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
      {/* {topics &&
        topics
          .filter(topic => showArchived || !topic.archived)
          .map(topic => (<animated.div style={trail}>
            <TopicCard
              key={topic._id}
              topic={topic}
              handleComplete={handleComplete}
              handleArchive={handleArchive}
              handleDelete={handleDelete}
            />

          </animated.div>
          ))} */}
      {trail.map((anim, i) => {
        const topic = relevantTopics[i]
        return (
          <animated.div style={anim} key={topic._id}>
            <TopicCard
              topic={topic}
              handleComplete={handleComplete}
              handleArchive={handleArchive}
              handleDelete={handleDelete}
            />
          </animated.div>
        )
      })}
    </>
  )
}

export default Topics
