module.exports = {
    default: {
        publish: false,
        paths: [
            'gherkin/features/**/*.feature'
        ],
        require: [
            'gherkin/step-definitions/**/*.js'
        ],
        format: [
            'progress',
            'json:reports/cucumber-report.json'
        ]
    }
};