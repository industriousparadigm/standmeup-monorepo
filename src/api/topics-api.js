const baseURL = 'http://localhost:3001/api/topics'

export const getTopics = () => fetch(baseURL).then(res => res.json())

export const createTopic = body =>
  fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const patchTopic = (id, body) =>
  fetch(`${baseURL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json())

export const deleteTopic = id =>
  fetch(`${baseURL}/${id}`, {
    method: 'DELETE'
  }).then(res => res.json())
