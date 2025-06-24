## Setup and execution steps

    npm install
    npx cypress open

## Cypress config

- I set the `baseUrl` to `https://automationteststore.com/` to avoid repeating the domain in every test.
  This allows us to use relative URLs with `cy.visit()` and keeps the test code cleaner and more maintainable.

- I used the `defaultCommandTimeout: 8000` setting to make Cypress wait up to 8 seconds for individual DOM elements or asynchronous operations to become available.
  This helps ensure more reliable testing in cases where elements load dynamically.

## Test files

- [homework_12.cy.js](cypress/e2e/homework_12.cy.js):
  The file contains automated E2E tests that verify product sorting, cart functionality, category count, and registration form validation.
  These tests cover key user flows, such as checking A–Z sorting, calculating cart totals, ensuring the presence of 7 product categories, and validating form error handling.

- [guestCheckoutFlow.cy.js](cypress/e2e/guestCheckoutFlow.cy.js):
  The file contains an end-to-end test that simulates a complete guest purchase flow.
  It verifies product search, review visibility, cart and checkout steps, guest payment without login, and accuracy of order details on the invoice page.
