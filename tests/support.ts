// import AuthCredentials from './fixtures/auth.json';

Cypress.Commands.add('enter', () => {
  cy.visit('/');
  // cy.get('form input').type(AuthCredentials.email);
  // cy.get('form input').type(AuthCredentials.password);
});
