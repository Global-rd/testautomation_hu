module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: [
      'features/steps/**/*.js',
      'features/support/**/*.js'
    ],
    format: [
      'progress',
      'json:reports/cucumber-report.json'
    ],
    publishQuiet: true,
    parallel: 1
  }
};
