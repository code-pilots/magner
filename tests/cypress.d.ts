declare namespace Cypress {
  interface Chainable {
    enter(): Chainable<Element>,
  }
}
