const { defineConfig } = require("cypress");

module.exports = defineConfig({
e2e: {
    //1. Feladat: Cypress config testreszabása
baseUrl: 'https://automationteststore.com', 
defaultCommandTimeout: 8000,
specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
setupNodeEvents(on, config) {
 // implement node event listeners here
 },
},
});