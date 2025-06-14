const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationteststore.com/',
    defaultCommandTimeout: 8000,
  },
});
