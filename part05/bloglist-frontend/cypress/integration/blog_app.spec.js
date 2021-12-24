describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#login-form').should('be.visible')
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })
})