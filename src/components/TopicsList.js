import React, { useState, useEffect } from 'react'
// import { Container } from 'reactstrap'
import { useAuth0 } from '../react-auth0-spa'
import TopicCard from '../components/TopicCard'
import Loading from '../components/Loading'
import { get } from '../api/API'

const TopicsList = () => {
  const [topics, setTopics] = useState(null)
  const [formData, setFormData] = useState('')
  const { loading, user } = useAuth0()

  useEffect(() => {
    get('/topics').then(setTopics)
  }, [])

  const handleAdd = async e => {
    e.preventDefault()
    fetch(`http://localhost:3001/api/topics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: formData })
    })
      .then(res => res.json())
      .then(data => setTopics([data, ...topics]))
  }

  const handleDelete = async topicId => {
    fetch(`http://localhost:3001/api/topics/${topicId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(console.log)
    let updatedTopics = topics
    setTopics(updatedTopics.filter(topic => topic._id !== topicId))
  }

  const handleComplete = async topicId => {
    fetch(`http://localhost:3001/api/topics/${topicId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        complete: true
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    const completedTopic = topics.find(topic => topic._id === topicId)

    completedTopic.complete = true
    console.log(completedTopic)
    setTopics([
      completedTopic,
      ...topics.filter(topic => topic._id !== topicId)
    ])
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
