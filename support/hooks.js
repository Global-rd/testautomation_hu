
const { Before, After, BeforeAll, AfterAll, defineParameterType } = require("@cucumber/cucumber");
const fs = require("fs");
const path = require("path");

// Define custom parameter type for date
defineParameterType({
  name: 'date',
  regexp: /\d{4}-\d{2}-\d{2}/,
  transformer: s => new Date(s)
});

BeforeAll(async function () {
  // Create necessary directories
  const directories = ["reports", "test-results", "test-results/screenshots"];

  directories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
});

Before(async function () {
  // Initialize browser session using World constructor
  await this.initBrowserSession();
});

After(async function (scenario) {
  // Take screenshot on failure
  if (scenario.result.status === "failed") {
    const scenarioName = scenario.pickle.name.replace(/\s+/g, "_");
    await this.takeScreenshot(`failed-${scenarioName}`);
  }

  // Close browser session
  await this.closeBrowserSession();
});

AfterAll(async function () {
  console.log("Test execution completed");
});
