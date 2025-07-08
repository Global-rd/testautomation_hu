## Contact List App Test Framework

This project is an automated BDD-based test framework built with Playwright and Cucumber, designed to test key functionalities of the following web application:  
https://thinking-tester-contact-list.herokuapp.com/


#### Installation:
```bash
git clone git@github.com:Global-rd/testautomation_hu.git
cd testautomation_hu
cd homework_4
npm install
```

(Optional, if running for the first time) Install Playwright browsers:
```bash
npx playwright install
```

#### Run tests:
```bash
npm run test
```

#### View reports:
```bash
npm run report
```


#### Configuration 
_cucumber.conf.js_
- Load step definitions from the steps/ folder
- Load hooks from support/
- Output test results in:
- JSON format (./reports/cucumber-report.json)
- Progress format in the console
- Suppress publishing to cucumber.io with --publish-quiet

_support/hooks.js_
- Before hook:
-- Launches the browser and sets up a fresh page for each scenario
--Automatically logs in before contact-related scenarios
- After hook:
-- Captures a screenshot on failure
-- Closes the browser after each scenario

Test Data Management
- Static credentials and user info stored in _fixtures/users.json_
- Dynamic contact data is generated using Faker via _fixtures/contactData.js_

### Content
Login Functionality
Successful login with valid credentials
Failed login with incorrect password
Data-driven login test with multiple invalid combinations

Contact Management
Add a new contact (via Data Table)
Edit an existing contact
Delete a contact
Use of Faker for dynamically generated test data
