const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 800,
  viewportWidth: 1280,
  e2e: {
    // 1. Feladat: Beallitottam a base URl-t es a timeout-ot atirtam 8 masodpercre.
    baseUrl: 'https://automationteststore.com/',
    defaultCommandTimeout: 8000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
