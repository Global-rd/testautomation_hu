const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://parabank.parasoft.com/',
        defaultCommandTimeout: 8000,
    },
});