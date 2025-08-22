# Test Automation Framework with Cypress

This project is an end-to-end test automation framework built with **Cypress**, designed to validate the functionality of the Parabank web application. It uses a Page Object Model (POM) and API service layers to create a clean, maintainable, and scalable test suite.

## 📁 Project Structure

The framework is organized as follows:

* **cypress/integration/**: Contains the main test files (`.cy.ts`).

* `open-new-account.cy.ts`: Tests the functionality for a user to open new checking and savings accounts via UI and API.

* `request-loan.cy.ts`: Validates the loan request process for a user.

* `transfer-funds.cy.ts`: Verifies fund transfers between different accounts, including overdraft scenarios.

* `user-profile.cy.ts`: Tests the ability to update and manage a user's profile information.

* **cypress/pages/**: Houses the Page Object Model (POM) files, abstracting page interactions into reusable classes.

* `AccountDetailsPage.ts`: Handles interactions and assertions on the account details page.

* `BasePage.ts`: A base class that provides common functionality for all other page classes, such as navigating to a page or verifying the URL.

* `LoginPage.ts`: Manages login and logout actions, as well as accessing user and account data.

* `NewAccountPage.ts`: Contains methods for creating new accounts and verifying the result.

* `OverviewPage.ts`: Represents the account overview page with methods for navigating to other pages and verifying account balances.

* `RequestLoanPage.ts`: Handles the loan application process and verifies loan status.

* `TransferFundsPage.ts`: Manages fund transfer operations and verifies the state of the transfer form.

* `UserProfilePage.ts`: Provides methods to interact with and verify user profile data.

* **cypress/support/**: Includes custom commands, helper functions, and data models to support the tests.

* `services/`: Contains API service classes to perform backend operations directly, bypassing the UI for efficiency.

\* \`base-service.ts\`: A base class for all service files with common assertion methods for API responses.

\* \`new-account-service.ts\`: Handles API requests for creating new accounts.

\* \`request-loan-service.ts\`: Manages API requests for loan applications.

\* \`transfer-funds-service.ts\`: Manages API requests for fund transfers.

\* \`user-profile-service.ts\`: Handles API requests for updating a user's profile.

\* \`user-service.ts\`: Contains methods for user registration and data cleanup.

* `model/`: Defines data structures for users and accounts.

\* \`Account.ts\`: An enum for different account types.

\* \`User.ts\`: Classes for the \`User\` and \`Address\` data models.

* **cypress/fixtures/**: Stores test data in JSON format, which can be dynamically loaded into tests.

* `default.json`: Contains default values for new accounts.

* `users.json`: Stores user data for testing purposes.

* **cypress.config.ts**: The main Cypress configuration file.

## ⚙️ Prerequisites

* **Node.js** (LTS version is recommended)

* **npm** (Node Package Manager)

## 🚀 Installation

    Clone this repository to your local machine.

    Navigate to the project root directory in your terminal.

    Install the project dependencies.

    ```bash
    npm install
    ```

## ▶️ Running the Tests
Cypress Test Runner (GUI)

To open the Cypress Test Runner and run tests interactively:

```bash
npx cypress open
```
Headless Mode

To run all tests in the terminal without opening the browser:

```bash
npx cypress run
```
Running Specific Test Files

To run a specific test file from the command line:

```bash
npx cypress run --spec "cypress/integration/transfer-funds.cy.ts"
```