# Automated UI Tests for AutomationTestStore.com

This repository contains a suite of automated End-to-End (E2E) UI tests developed using Cypress. The tests are designed to validate key functionalities of the [AutomationTestStore website](https://automationteststore.com/).

## Table of Contents

1.  [Project Description](#project-description)
2.  [Tested Application](#tested-application)
3.  [Prerequisites](#prerequisites)
4.  [Installation](#installation)
5.  [Configuration](#configuration)
6.  [How to Run Tests](#how-to-run-tests)
    * [Cypress Test Runner (Interactive)](#cypress-test-runner-interactive)
    * [Headless Mode (CLI)](#headless-mode-cli)
7.  [Test Suites Overview](#test-suites-overview)
8.  [Homework Tasks Addressed](#homework-tasks-addressed)

## 1. Project Description

This project automates UI test scenarios for an e-commerce website, covering various user flows such as product browsing, cart functionalities, user registration, and guest checkout. The tests are written in JavaScript using the Cypress testing framework.

## 2. Tested Application

The target application for these tests is:
https://automationteststore.com/

## 3. Prerequisites

Before running these tests, ensure you have the following installed:

* **Node.js**: [Download & Install Node.js](https://nodejs.org/en/download/) (Includes npm - Node Package Manager)

## 4. Installation

1.  **Clone the repository:**
    ```bash
    gh repo clone Global-rd/testautomation_hu
    git checkout tamara_nagy_11
    ```

2.  **Install Cypress and other dependencies:**
    Navigate to the project root directory in your terminal and run:
    ```bash
    npm install
    ```
    This command will install all the necessary packages listed in `package.json`, including Cypress.

## 5. Configuration

The Cypress project is configured via `cypress.config.js`. Key configurations include:

* **`baseUrl`**: Set to `https://automationteststore.com/` to allow for relative URLs in tests (e.g., `cy.visit('/')`).
* **`defaultCommandTimeout`**: Increased to `8000ms` to provide more time for elements to become actionable on slower-loading pages or during complex interactions.

**`cypress.config.js` content:**
```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: '[https://automationteststore.com/](https://automationteststore.com/)',
    defaultCommandTimeout: 8000,
  },
});
```

## 6. How to Run Tests

### Cypress Test Runner (Interactive)

This command opens the Cypress Test Runner UI, allowing you to select and watch tests run in a browser.

```bash
npm run cy:open
```

Follow the prompts in the Cypress UI to choose your browser and select the desired test files (`.cy.js`) to run.

### Headless Mode (CLI)

This command runs all tests in headless mode (without opening a browser GUI), which is ideal for Continuous Integration (CI) environments.

```bash
npm run cy:run
```

You can also run specific test files or folders:

```bash
npm run cy:run --spec "cypress/e2e/guest-check-out.cy.js"
```

## 7. Test Suites Overview

The tests are organized into the `cypress/e2e` directory:

* **`cart.cy.js`**:
    * Tests functionalities related to adding products to the shopping cart.
    * Verifies product names, prices, and quantities in the cart.
    * Asserts the sub-total and total values in the cart.

* **`guest-check-out.cy.js`**:
    * Implements the comprehensive End-to-End guest checkout flow.
    * Includes searching for products, navigating to product details, verifying reviews, adding items to cart, proceeding to checkout as a guest, filling out guest details, and placing the order.
    * Contains error handling verification for invalid guest checkout form submissions.
    * Validates details on the final invoice page.

* **`product-list.cy.js`**:
    * Covers tests for product listing pages.
    * Verifies navigation to product categories.
    * Asserts proper alphabetical sorting of products (A-Z).

* **`user-management.cy.js`**:
    * Tests user authentication and registration flows.
    * Includes navigation to login/registration pages.
    * Verifies successful user registration.
    * Asserts validation errors during registration (e.g., missing fields, password mismatch).
