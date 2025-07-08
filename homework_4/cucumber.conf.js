module.exports = {
  default: [
    '--require ./steps/**/*.js',
    '--require ./support/**/*.js',
    '--format json:./reports/cucumber-report.json',
    '--format progress',
    '--publish-quiet',
    './features/**/*.feature'
  ].join(' ')
}
