const APP_URL = process.env.APP_URL || 'http://localhost:8080'

describe('Credentials', () => {
  beforeEach(() => {
    cy.visit(APP_URL)

    cy.get('#header-login-button').click()
    cy.get('#modal-login')

    cy.get('#email-field').type('igor@igor.me')
    cy.get('#password-field').type('1234')
    cy.wait(2000)
    cy.get('#submit-button').click()
    cy.wait(5000)

    cy.visit(`${APP_URL}/credencials`)
    cy.wait(2000)
  })

  it('should generate an api_key', () => {
    const oldApiKey = cy.get('#apikey').invoke('text')
    cy.get('#generate-apikey').click()
    cy.wait(2000)

    cy.get('#apikey').then(($teste) => {
      expect(oldApiKey).to.not.equal($teste)
    })
  })

  it('should generate an script with correctly api_key at first render', () => {
    let scriptMock
    cy.get('#apikey').then(($apikey) => {
      scriptMock = `<script src="https://brian-izaki-feedbacker-widget.netlify.app?api_key=${$apikey.text()}"></script>`
    })

    cy.get('#script-with-apikey').then(($value) => {
      expect($value.text()).eq(scriptMock)
    })
  })

  // erro ao tentar pegar o valor com readText
  it.skip('should copy api key correctly', () => {
    const apiKey = cy.get('#apikey').invoke('text')
    cy.get('#copy-apikey').click()
    cy.window().its('navigator.clipboard')
      .invoke('readText').should('equal', apiKey)
  })
})
