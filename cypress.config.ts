import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: 'https://parabank.parasoft.com/parabank',
        defaultCommandTimeout: 8000,
        reporter: 'json',
        reporterOptions: {
            outputFile: 'results.json',
            reportDir: 'cypress/reports',
            overwrite: true,
        },
    },
    video: true,
});

