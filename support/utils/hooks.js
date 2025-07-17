const { Before, After, BeforeAll, AfterAll } = require("@cucumber/cucumber");
const fs = require("fs");
const path = require("path");

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
