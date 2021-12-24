const user = {
  name: 'Ronald Ogando',
  username: 'reon150',
  password: '123456789'
}

const blog = {
  title: 'cypress testing',
  author: 'Ronald Ogando',
  url: 'https',
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#login-form').should('be.visible')
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', `${user.name} logged in`)
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: user.username, password: user.password })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#url').type(blog.url)
      cy.get('#author').type(blog.author)
      cy.get('#create-btn').click()
      cy.contains(blog.title)
      cy.contains(blog.author)
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog(blog)
      })

      it('it can be made important', function () {
        cy.contains(blog.title).find('#like-btn').click()
        cy.contains(blog.title).find('#view-btn').click()
        cy.get('.blog').should('contain.text', 'likes 1')
      })
    })
  })
})