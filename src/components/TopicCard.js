import React from 'react'
import Moment from 'react-moment'

const TopicCard = ({
  topic,
  topic: { _id, name, complete, createdAt },
  handleComplete,
  handleDelete,
  handleArchive
}) => {
  return (
    <div
      className={`card mx-auto bg-${complete ? 'success' : 'warning'} mb-3`}
      style={{ maxWidth: '18rem' }}
    >
      <div className='card-body'>
        <h5 className={`card-title text-${complete ? 'white' : 'dark'}`}>
          {name}
        </h5>
        <p className={`card-text text-${complete ? 'light' : 'black-50'}`}>
          <Moment format='ddd MMM D'>{createdAt}</Moment>
        </p>
        {!complete && (
          <button
            onClick={() => handleComplete(_id)}
            className='btn btn-sm btn-success mr-2'
          >
            Done!
          </button>
        )}
        <button
          onClick={() => handleArchive(_id)}
          className='btn btn-sm btn-info mr-2'
        >
          Archive
        </button>
        <button
          onClick={() => handleDelete(_id)}
          className='btn btn-sm btn-danger'
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TopicCard
