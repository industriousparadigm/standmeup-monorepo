import React from 'react'
import Moment from 'react-moment'

const TopicCard = ({ topic, handleComplete, handleDelete }) => {
  return (
    <div
      className={`card text-white bg-${
        topic.complete ? 'success' : 'info'
      } mb-3`}
      style={{ maxWidth: '18rem' }}
    >
      <div className='card-body'>
        <h5 className='card-title'>{topic.name}</h5>
        <p className='card-text'>
          <Moment format='ddd MMM D'>{topic.createdAt}</Moment>
        </p>
        <button onClick={handleComplete} className='btn btn-success mr-2'>
          Done!
        </button>
        <button
          onClick={() => handleDelete(topic._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TopicCard
