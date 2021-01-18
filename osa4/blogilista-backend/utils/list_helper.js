const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (stored, blog) => {
    return stored.likes > blog.likes ? stored : blog
  }
  return blogs.length === 0 ? undefined : blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined

  let authorsBlogs = new Map()

  // Map blog authors with their respective blog amount to 'authorsBlogs'
  blogs.forEach((blog) => {
    authorsBlogs.has(blog.author)
      ? authorsBlogs.set(blog.author, authorsBlogs.get(blog.author) + 1)
      : authorsBlogs.set(blog.author, 1)
  })

  let authorWithMostBlogs = { author: null, blogs: 0 }

  // Find the author with most blogs
  authorsBlogs.forEach((blogs, author) => {
    authorWithMostBlogs = blogs > authorWithMostBlogs.blogs ? { author, blogs } : authorWithMostBlogs
  })

  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined

  let authorsLikes = new Map()

  // Map blog authors with their respective likes to 'authorsLikes'
  blogs.forEach((blog) => {
    let likes = blog.likes
    authorsLikes.has(blog.author)
      ? authorsLikes.set(blog.author, authorsLikes.get(blog.author) + likes)
      : authorsLikes.set(blog.author, likes)
  })

  let authorWithMostLikes = { author: null, likes: 0 }

  // Find the author with most likes
  authorsLikes.forEach((likes, author) => {
    authorWithMostLikes = likes > authorWithMostLikes.likes ? { author, likes } : authorWithMostLikes
  })

  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
