const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://parabank.parasoft.com",
    supportFile: "cypress/support/e2e.js",
    fixturesFolder: "cypress/fixtures",
    specPattern: "cypress/e2e/**/*.cy.js",
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
  },
});
