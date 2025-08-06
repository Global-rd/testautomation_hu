const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'mochawesome',
  e2e: {
    baseUrl: 'https://parabank.parasoft.com',
    setupNodeEvents(on, config) {},
  },
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: true,
    json: true
  },
});