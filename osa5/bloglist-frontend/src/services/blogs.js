import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

const like = async (blogObject) => {
  const config = {
    headers: { Authorization: token }
  }

  try {
    const blogs = await getAll()
    console.log(blogs)
    console.log('id to match', blogObject.id)
    const blogToLike = blogs.find((blog) => blog.id === blogObject.id)
    console.log('to like', blogToLike)
    const currentLikes = !isNaN(parseInt(blogToLike.likes)) ? blogToLike.likes : 0
    const newLikes = currentLikes + 1
    console.log('current', currentLikes, 'new', newLikes)
    const response = await axios.put(`${baseUrl}/${blogToLike.id}`, { likes: newLikes }, config)
    return response.data
  } catch (exception) {
    return exception
  }
}

export default { getAll, create, remove, like, setToken }
