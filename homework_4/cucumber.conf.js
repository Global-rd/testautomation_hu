module.exports = {
    default: `--require steps/**/*.js
              --require utils/**/*.js
              --format json:reports/cucumber-report.json
              --format progress
              --publish-quiet`
};
