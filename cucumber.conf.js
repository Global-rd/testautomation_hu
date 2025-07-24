
module.exports = {
  default: {
    require: [
      "tests/steps/**/*.js",
      "support/**/*.js"
    ],
    format: [
      "progress",
      "json:reports/cucumber-report.json"
    ],
    paths: ["tests/feature/**/*.feature"],
    publishQuiet: true 
  }
};
