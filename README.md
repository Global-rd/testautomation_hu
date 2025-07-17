# Contact List test automation

A professional BDD-based test automation framework using Playwright + Cucumber to test the login & contact management functionality of the [Thinking Tester Contact List](https://thinking-tester-contact-list.herokuapp.com/) web application.

## Setup

1. Clone or download the project repository
2. Navigate to the project directory:

   ```bash
   cd contact-list-tests
   ```

3. Install required dependencies:

   ```bash
   npm install
   ```

4. Install required packages:

   ```bash
   npm install @cucumber/cucumber @playwright/test playwright
   npm install --save-dev @cucumber/html-formatter
   ```

5. Install Playwright browsers:

   ```bash
   npx playwright install
   ```

6. Create environment variables file (`.env`):
   ```bash
   EMAIL=your_test_email@example.com
   PASSWORD=your_test_password
   WRONG_PSW=incorrect_password
   ```

## Running Tests

```bash
# Run all Cucumber tests
npm run test
npm run cucumber

# Run Playwright tests
npm run test:playwright

# Run specific feature tests
npm run test:login
npm run test:contacts

# Run with Cucumber directly
npx cucumber-js

# Run tests by tags
npx cucumber-js --tags "@login"
npx cucumber-js --tags "@smoke"
npx cucumber-js --tags "@negative"
npx cucumber-js --tags "@contacts"
npx cucumber-js --tags "@create"
npx cucumber-js --tags "@edit"
npx cucumber-js --tags "@delete"
```

## What gets tested

- **Login (@login):**
  - Valid credentials (@smoke)
  - Invalid password (@negative)
  - Error message validation
- **Contacts (@contacts):**
  - Create new contact (@smoke @create)
  - Edit existing contact (@edit)
  - Delete contact (@delete)
  - Multiple contact scenarios with test data (@create)

## Reports

After running tests, view results:

### Cucumber reports:

- **HTML Report:** `reports/cucumber-report.html`
- **JSON Report:** `reports/cucumber-report.json`

### Playwright reports:

- **HTML Report:** `playwright-report/index.html`
- **JSON Results:** `reports/playwright-results.json`

### Test artifacts:

- **Screenshots:** `test-results/screenshots/` (on failures)

## Viewing Reports

```bash
# Open Cucumber HTML report
open reports/cucumber-report.html

# Open Playwright HTML report
npx playwright show-report
# or directly:
open playwright-report/index.html
```

## Troubleshooting

If tests fail:

1. Check that the application URL is accessible
2. Verify `.env` variables are set correctly
3. Review screenshots in `test-results/screenshots/`
4. Check console output for detailed error messages
5. Ensure Playwright browsers are installed: `npx playwright install`
