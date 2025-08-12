import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://practice.expandtesting.com/webpark/',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    experimentalRunAllSpecs: true
  },
  env: {
    apiUrl: 'https://practice.expandtesting.com/webpark/calculate-cost'
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite'
    },
    supportFile: 'cypress/support/component.ts',
    specPattern: 'cypress/component/**/*.cy.ts'
  }
})
