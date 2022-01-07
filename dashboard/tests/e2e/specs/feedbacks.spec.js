const APP_URL = process.env.APP_URL || 'http://localhost:8080'

// const feedbackResult = [
//   {
//     text: 'Muito bom!',
//     fingerprint: '490135491',
//     id: 'eab759f8-f238-4ff9-ae91-ee1558982329',
//     apiKey: 'fcd5015c-10d3-4e9c-b395-ec7ed8850165',
//     type: 'OTHER',
//     device: 'Chrome 85.0, macOS 10.14',
//     page: 'https://feedbacker.com/pricing',
//     createdAt: new Date('2020-11-13').getTime()
//   },
//   {
//     text: 'Muitos erros slkkkkkkk',
//     fingerprint: '490135491',
//     id: 'eab759f8-f238-4ff9-ae91-ee1558982329',
//     apiKey: 'fcd5015c-10d3-4e9c-b395-ec7ed8850165',
//     type: 'ISSUE',
//     device: 'Chrome 85.0, macOS 10.14',
//     page: 'https://feedbacker.com/pricing',
//     createdAt: new Date('2020-10-23').getTime()
//   }
// ]

describe('Feedbacks', () => {
  it('should have container to feedbacks', () => {
    cy.visit(APP_URL)

    cy.get('#header-login-button').click()
    cy.wait(2000)

    cy.get('#email-field').type('igor@igor.me')
    cy.get('#password-field').type('1234')
    cy.get('#submit-button').click()
    cy.wait(5000)

    cy.get('#main-feedbacks-list')
    // cy.intercept('GET', `${cy.env('API_SERVER')}/feedbacks`, feedbackResult)
  })
})
