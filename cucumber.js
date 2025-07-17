require("dotenv").config();

module.exports = {
  default: {
    require: [
      "tests/steps/**/*.js",
      "support/utils/world.js",
      "support/utils/hooks.js",
    ],
    format: [
      "progress",
      "json:reports/cucumber-report.json",
      "html:reports/cucumber-report.html",
      "@cucumber/pretty-formatter",
    ],
    paths: ["tests/features/login.feature", "tests/features/contacts.feature"], // Run login tests first then run contact tests
    timeout: 30000, // 30 seconds timeout
  },

  // Configuration for HTML reports
  formatOptions: {
    html: {
      collapseDocStrings: false, // Keep multi-line strings expanded in HTML report
      snippetInterface: "async-await", // Generate async/await code snippets for missing steps
    },
  },
};
