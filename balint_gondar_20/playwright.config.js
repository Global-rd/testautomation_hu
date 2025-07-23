// playwright.config.js
// Playwright config with global test data

const { defineConfig } = require('@playwright/test');

const apiUrl = 'https://practice.expandtesting.com/webpark/calculate-cost';
const testPayload = {
    parkType: 'Valet',
    entryDate: '2025-07-21T16:11',
    exitDate: '2025-07-22T16:11',
};

module.exports = defineConfig({
    use: {
        apiUrl,
        testPayload,
    },
});

module.exports.apiUrl = apiUrl;
module.exports.testPayload = testPayload; 