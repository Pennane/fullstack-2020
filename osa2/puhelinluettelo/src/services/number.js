import axios from 'axios'
const baseUrl = 'http://localhost:3001/numbers'

const getAll = () => {
  let request = axios.get(baseUrl)
  return request.then((res) => res.data)
}

const add = (newObject) => {
  let request = axios.post(baseUrl, newObject)
  return request.then((res) => res.data)
}

const update = (id, newObject) => {
  let request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((res) => res.data)
}

const remove = (id) => {
  let request = axios.delete(`${baseUrl}/${id}`)
  return request.then((res) => res.data)
}

export default {
  getAll,
  add,
  update,
  remove
}
