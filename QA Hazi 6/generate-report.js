const reporter = require("cucumber-html-reporter");

const options = {
  theme: "bootstrap",
  jsonFile: "reports/cucumber-report.json",
  output: "playwright-report/report.html",
  reportSuiteAsScenarios: true,
  launchReport: true, // opens in browser after run
  metadata: {
    Platform: process.platform,
    "Node Version": process.version,
    Executed: "Local",
  },
};

reporter.generate(options);
