# ParaBank Test Automation

Comprehensive Cypress end-to-end test automation suite for [ParaBank](https://parabank.parasoft.com/parabank), a demo banking web application. This project implements automated testing scenarios covering core banking functionalities including account management, money transfers, loan requests, and profile updates using both UI interactions and API validations.

## Prerequisites

- Node.js (v14 or higher)
- npm

## Setup

1. Clone or download project repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create ParaBank account at https://parabank.parasoft.com/
4. Create `.env` file:

```bash
USERNAME=your_parabank_username
PASSWORD=your_parabank_password
BASE_URL=https://parabank.parasoft.com/parabank
```

## Running Tests

```bash
# Run all tests with HTML report
npm run test:homework

# Open Cypress GUI
npm run cy:open

# Run tests headless
npm run cy:run
```

## What gets tested

**Account Management**

- Verify creation of new checking accounts with a starting balance of $3000
- Open savings accounts via dedicated menu navigation
- Validate account balances in both UI and API responses

**Money Transfer Operations**

- Handle overdraft scenarios when transfers exceed account balance
- Display negative balance in the Account Overview interface
- Prevent transfers to the same account and validate errors

**Loan Processing**

- Submit loan applications with partially completed fields
- Validate form fields as required or optional
- Verify business logic for incomplete applications

**Profile Management**

- Update user profiles via direct API calls (bypassing UI)
- Validate API responses for success messages
- Synchronise profile data between API and UI display

**System Validations**

- Verify UI elements and interaction testing
- Test API endpoints with validation of JSON response structures
- Handle errors and edge case scenarios
- Cross-verify UI display with backend data

## Reports

Test reports are automatically generated when using `npm run test:homework`.
Results include:

- HTML report with detailed test execution summary
- Screenshots of any test failures

## Viewing Reports

```bash
# Generate and view reports
npm run test:homework

# Reports are saved to:
cypress/reports/mochawesome.html    # Main HTML report
cypress/screenshots/                # Failure screenshots

Open cypress/reports/mochawesome.html in your browser to view the detailed test results, including pass/fail status, execution times, and error details.
```

## Troubleshooting

## Common issues:

### Login failures

- Verify ParaBank account is active at https://parabank.parasoft.com/
- Check `.env` file contains correct `USERNAME` and `PASSWORD`
- Ensure no extra spaces in credentials
- If you are unable to log-in try to register a new user (and update `.env`)

### Network/timeout issues

```bash
# Increase timeout in cypress.config.js:
defaultCommandTimeout: 10000
```

### API endpoint failures

- ParaBank demo may have temporary outages
- Some API endpoints may not be fully functional in the demo environment
- Tests include fallback validation methods
