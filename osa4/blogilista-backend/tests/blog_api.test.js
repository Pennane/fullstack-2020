const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const blogsInDb = async () => {
  const blogs = await Blog.find({}).exec()
  return blogs.map((blog) => blog.toJSON())
}

let initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  }
]

beforeEach(async (done) => {
  try {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'root', passwordHash })
    const savedUser = await user.save()

    for (blogObject of initialBlogs) {
      let blog = new Blog({ ...blogObject, user: savedUser.id })
      await blog.save()
    }
  } catch (error) {
  } finally {
    done()
  }
})

describe('displaying blogs', () => {
  test('a right amount of blogs is returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
  })

  test('blogs return with correctly formed id', async () => {
    const blogs = await blogsInDb()
    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined()
      expect(blog._id).toBeUndefined()
    })
  })
})

describe('adding blogs', () => {
  test('a new blog can  be added with a token', async () => {
    const newBlog = {
      title: 'Testi Blogi68',
      author: 'Matti Möttönen',
      url: '127.0.0.1',
      likes: 15
    }

    const user = await User.findOne({})

    const userForToken = {
      username: 'root',
      id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    await await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd.length).toBe(initialBlogs.length + 1)

    const hasNewTitle = blogsAtEnd.find((blog) => blog.title === newBlog.title)
    expect(hasNewTitle).toBeTruthy()
  })

  test('a new blog can not be added without a token', async () => {
    const newBlog = {
      title: 'Testi Blogi68',
      author: 'Matti Möttönen',
      url: '127.0.0.1',
      likes: 15
    }

    await await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd.length).toBe(initialBlogs.length)

    const hasNewTitle = blogsAtEnd.find((blog) => blog.title === newBlog.title)
    expect(hasNewTitle).toBeFalsy()
  })

  test('a new blog with undefined likes gets defined with 0 likes', async () => {
    const newBlogWithNoLikes = {
      title: 'Testi Blogi68',
      author: 'Matti Möttönen',
      url: '127.0.0.1'
    }

    const user = await User.findOne({})

    const userForToken = {
      username: 'root',
      id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    let response = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlogWithNoLikes)

    expect(response.body.likes).toBe(0)
  })

  test('a new blog with undefined title and/or url gets responded with 400', async () => {
    const newBlogWithNoTitle = {
      author: 'Matti Möttönen',
      url: '127.0.0.1',
      likes: 10
    }

    const newBlogWithNoLink = {
      title: 'Testi Blogi',
      author: 'Matti Möttönen',
      likes: 10
    }

    const newBlogWithNeither = {
      title: 'Testi Blogi',
      author: 'Matti Möttönen',
      likes: 10
    }

    const user = await User.findOne({})

    const userForToken = {
      username: 'root',
      id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlogWithNoTitle)
      .expect(400)
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlogWithNoLink)
      .expect(400)
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlogWithNeither)
      .expect(400)
  })
})

describe('removing blogs', () => {
  test('removing a blog by id removes the blog and responds with 204', async () => {
    const user = await User.findOne({})

    const userForToken = {
      username: 'root',
      id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    const blogsBeforeRemove = await blogsInDb()

    await api
      .delete(`/api/blogs/${blogsBeforeRemove[0].id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(204)

    const newBlogs = await blogsInDb()

    const hasRemovedblog = newBlogs.find((blog) => blog.title === initialBlogs[0].title)

    expect(hasRemovedblog).toBeFalsy()

    expect(newBlogs).toHaveLength(initialBlogs.length - 1)
  })

  test('removing a blog that does not exist responds with 400 and content stays', async () => {
    const user = await User.findOne({})

    const userForToken = {
      username: 'root',
      id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    await api
      .delete('/api/blogs/idthatdoesnotexist')
      .set('Authorization', 'Bearer ' + token)
      .expect(400)
    const blogs = await blogsInDb()
    expect(blogs).toHaveLength(initialBlogs.length)
  })

  test('trying to remove without id responds with 400', async () => {
    const user = await User.findOne({})

    const userForToken = {
      username: 'root',
      id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    await api
      .delete('/api/blogs/')
      .set('Authorization', 'Bearer ' + token)
      .expect(400)
  })
})

describe('updating blogs', () => {
  test('update a blog with new likes and title', async () => {
    const user = await User.findOne({})

    const userForToken = {
      username: 'root',
      id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    const blogsBeforeUpdate = await blogsInDb()

    const oldBlog = blogsBeforeUpdate[0]

    const updatedBlogData = {
      likes: 987,
      title: 'Testi Blogi'
    }

    await api
      .put(`/api/blogs/${oldBlog.id}`)
      .set('Authorization', 'Bearer ' + token)
      .send(updatedBlogData)
      .expect(200)

    const blogsAfterUpdate = await blogsInDb()

    const updatedBlog = blogsAfterUpdate.find((blog) => blog.id === oldBlog.id)
    expect(updatedBlog).toBeTruthy()
    expect(updatedBlog.title).toBe(updatedBlogData.title)
    expect(updatedBlog.likes).toBe(updatedBlogData.likes)
    expect(updatedBlog.author).toBe(oldBlog.author)
    expect(updatedBlog.url).toBe(oldBlog.url)
  })
  test('update a blog with redundant data', async () => {
    const blogsBeforeUpdate = await blogsInDb()

    const oldBlog = blogsBeforeUpdate[0]

    const updatedBlogData = {
      nonesense: 'blaah'
    }

    const user = await User.findOne({})

    const userForToken = {
      username: 'root',
      id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    await api
      .put(`/api/blogs/${oldBlog.id}`)
      .set('Authorization', 'Bearer ' + token)
      .send(updatedBlogData)
      .expect(200)

    const blogsAfterUpdate = await blogsInDb()

    const updatedBlog = blogsAfterUpdate.find((blog) => blog.id === oldBlog.id)
    expect(updatedBlog).toBeTruthy()
    expect(updatedBlog.title).toBe(oldBlog.title)
    expect(updatedBlog.likes).toBe(oldBlog.likes)
    expect(updatedBlog.author).toBe(oldBlog.author)
    expect(updatedBlog.url).toBe(oldBlog.url)
  })
})

afterAll((done) => {
  mongoose.connection.close()
  done()
})
