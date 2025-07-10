module.exports = {
  default: {
    require: [
      "step-definitions/*.js",
      "support/*.js"
    ],
    format: [
      "progress",
      "json:reports/cucumber-report.json"
    ],
    paths: [
      "features/*.feature"
    ],
    publishQuiet: true
  }
};