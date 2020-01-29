import React, { useState, useEffect } from 'react'
// import { Container } from 'reactstrap'
import { useAuth0 } from '../react-auth0-spa'
import TopicCard from '../components/TopicCard'
import Loading from '../components/Loading'
import {
  getTopics,
  postTopic,
  patchTopic,
  removeTopic
} from '../api/topics-api'

const TopicsList = () => {
  const [topics, setTopics] = useState(null)
  const [formData, setFormData] = useState('')

  useEffect(() => {
    getTopics().then(setTopics)
  }, [])

  const { loading, user } = useAuth0()

  const handleAdd = async e => {
    e.preventDefault()
    const newTopic = { name: formData, user: getUserObject() }
    postTopic(newTopic).then(data => setTopics([data, ...topics]))
  }

  const handleDelete = async topicId => {
    removeTopic(topicId)
    let updatedTopics = topics
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
    console.log({ user: { sub, name, picture, email } })
    return { sub, name, picture, email }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <p className='text-muted'>{user.name}</p>
      <form className='form-inline col-md-4 col-md-offset-4'>
        <div className='form-group mx-sm-3 mb-2'>
          <label htmlFor='input-new-topic' className='sr-only'>
            new topic
          </label>
          <input
            type='text'
            className='form-control'
            id='input-new-topic'
            placeholder='new topic'
            value={formData}
            onChange={e => setFormData(e.target.value)}
          />
        </div>
        <button
          onClick={handleAdd}
          type='submit'
          className='btn btn-primary mb-2'
        >
          add
        </button>
      </form>

      {topics &&
        topics.map(topic => (
          <TopicCard
            key={topic._id}
            topic={topic}
            handleDelete={handleDelete}
            handleComplete={handleComplete}
          />
        ))}
    </>
  )
}

export default TopicsList
