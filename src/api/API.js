const baseURL = 'http://localhost:3001/api'

export const get = url => fetch(baseURL + url).then(res => res.json())
