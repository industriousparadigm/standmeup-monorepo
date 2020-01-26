import React from 'react'
import TopicsList from '../components/TopicsList'

const Topics = () => {
  return (
    <div className='container-fluid text-center'>
      <h2>Your topics for today</h2>
      <TopicsList className='mx-auto' />
    </div>
  )
}

export default Topics
