import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:8080/parabank',
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

