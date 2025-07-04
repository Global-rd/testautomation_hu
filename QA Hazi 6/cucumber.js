module.exports = {
  default: [
    "--require features/step_definitions/*.js",
    "--require support/hooks.js",
    "--require support/world.js",
    "--format progress",
    "--format json:reports/cucumber-report.json",
    "--publish-quiet",
  ].join(" "),
};
