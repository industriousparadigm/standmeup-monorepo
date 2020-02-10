const baseURL = 'http://localhost:3001/api/topics'

export const getTopics = () => fetch(baseURL).then(res => res.json())

export const createTopic = (body, token) =>
  fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const patchTopic = (id, body, token) =>
  fetch(`${baseURL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
      // Authorization: `Bearer ${token}`
    }
  }).then(res => res.json())

export const deleteTopic = (id, token) =>
  fetch(`${baseURL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json())
