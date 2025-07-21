module.exports = {
    default: {
        publish: false,
        paths: [
            'features/**/*.feature'
        ],
        require: [
            'fetures/step-definitions/**/*.js'
        ],
        format: [
            'progress',
            'json:reports/cucumber-report.json'
        ]
    }
};