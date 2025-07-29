// playwright.config.js
// Playwright config with global test data

const { defineConfig, devices } = require('@playwright/test');

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
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
});

module.exports.apiUrl = apiUrl;
module.exports.testPayload = testPayload; 