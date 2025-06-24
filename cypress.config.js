const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaulCommandTimeout: 8000,
  e2e: {
    baseUrl: 'https://automationteststore.com'
  },
});
