const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://parabank.parasoft.com/parabank/",
    defaultCommandTimeout: 8000,
  },
  env: {
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
  },
  setupNodeEvents(on, config) {
    // validate that required environment variables exist
    if (!process.env.USERNAME || !process.env.PASSWORD) {
      throw new Error("Missing required ParaBank credentials in .env file");
    }
    return config;
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: false,
  },
});
