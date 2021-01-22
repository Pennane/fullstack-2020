Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createAccount', ({ username, name, password }) => {
  cy.request('POST', 'http://localhost:3001/api/users', {
    username,
    name,
    password
  })
})

Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/blogs',
    body: blog,
    auth: { bearer: JSON.parse(localStorage.getItem('loggedUser')).token }
  })
})

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createAccount({
      username: 'pennanen',
      name: 'Arttu Pennanen Cypress',
      password: 'salasana'
    })
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Blogs')
  })

  it('login form initially open', function () {
    cy.get('#login .toggledContent').should('have.css', 'display', 'block')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('pennanen')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('Logged in as Arttu Pennanen')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('pennanen')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').contains('Wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'pennanen', password: 'salasana' })
    })

    it('a new blog can be created', function () {
      cy.contains('Create a new blog').click()
      cy.get('#new-blog-title').type('a blog created by cypress')
      cy.get('#new-blog-author').type('cypress')
      cy.get('#new-blog-url').type('https://www.cypress.io/')
      cy.contains('Add new blog').click()
      cy.contains('a blog created by cypress')
    })
  })

  describe('dealing with present blogs', function () {
    beforeEach(function () {
      cy.login({ username: 'pennanen', password: 'salasana' })
      cy.createBlog({ title: 'Test Blog From Cypress', author: 'Cypress', url: 'https://www.cypress.io/' })
      cy.visit('http://localhost:3000')
    })

    it('can like a blog', function () {
      cy.get('.blog .toggleButton').click()
      cy.get('.blog .likeButton').click()
      cy.get('.blog .likesValue').should('contain', '1')
    })

    it('can remove a blog', function () {
      cy.get('.blog .toggleButton').click()
      cy.contains('Delete').click()
      cy.contains('Removed a blog')
    })

    it.only('Blogs are sorted by descending likes', function () {
      cy.createBlog({
        title: 'Test Blog From Cypress 2',
        likes: 100,
        author: 'Cypress',
        url: 'https://www.cypress.io/'
      })
      cy.createBlog({ title: 'Test Blog From Cypress 3', likes: 10, author: 'Cypress', url: 'https://www.cypress.io/' })
      cy.createBlog({ title: 'Test Blog From Cypress 4', likes: 90, author: 'Cypress', url: 'https://www.cypress.io/' })
      cy.visit('http://localhost:3000')
      cy.get('.blog').then((blogs) => {
        let initialOrder = [...blogs].map((blog) => parseInt(blog.querySelector('.likesValue').textContent))
        let newOrder = [...initialOrder].sort((a, b) => (a > b ? -1 : 1))
        let equalOrder = newOrder.every((a, i) => a === initialOrder[i])
        expect(equalOrder).to.be.true
      })
    })
  })
})
