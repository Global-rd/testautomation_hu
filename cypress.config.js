const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationteststore.com', // Első feladat
    defaultCommandTimeout: 8000, // Első feladat
  }
});
