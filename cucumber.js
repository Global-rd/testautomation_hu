module.exports = {
    default: {
        publish: false,
        paths: [
            'features/**/*.feature'
        ],
        require: [
            'support/utils/world.js',
            'support/utils/hooks.js',
            'features/step_definitions/**/*.js',
        ],
        formatOptions: {
            snippetInterface: "async-await"
        },
        format: [
            'progress',
            'json:reports/cucumber-report.json'
        ]
    }
};