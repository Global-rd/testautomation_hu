const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://parabank.parasoft.com",
    specPattern: "cypress/e2e/**/*.spec.js",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // You can plug reporters here if needed
    },
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
  },
});
