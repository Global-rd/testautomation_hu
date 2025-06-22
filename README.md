
# Automation Test Store - UI Automation Tests with Cypress

This repository contains automated UI tests for the [Automation Test Store](https://automationteststore.com) website, built using Cypress. The tests cover various functionalities like product sorting, shopping cart operations, form error handling, and an end-to-end guest checkout flow.

---

## Setup and Running the Tests

Follow these steps to set up the project and run the Cypress tests on your local machine:

### 1. Prerequisites

* **Node.js and npm:** Ensure you have Node.js (which includes npm) installed. You can download it from [nodejs.org](https://nodejs.org/).

### 2. Installation

1. **Clone the repository:**
   **Bash**

   ```
   git clone https://github.com/Global-rd/testautomation_hu/tree/istvan_zoltani_12
   cd testautomation_hu


   ```
2. **Install Cypress and other dependencies:**
   **Bash**

   ```
   npm install
   ```

### 3. Running the Tests

You have two options to run the tests:

* **Cypress Test Runner (Interactive GUI):**
  This opens the Cypress desktop application, allowing you to select and run specific test files or the entire suite visually.
  **Bash**

  ```
  npx cypress open
  ```
* **Headless Mode (Command Line):**
  This runs all tests directly from the command line without opening a browser GUI. This is ideal for Continuous Integration (CI) environments.
  **Bash**

  ```
  npx cypress run
  ```

---

## Cypress Configuration Explanation

The `cypress.config.js` file is configured to optimize test execution for the Automation Test Store website:

* **`baseUrl: 'https://automationteststore.com'`** : This setting defines the base URL for all tests. It allows us to use `cy.visit('/')` or `cy.visit('/some/path')` instead of writing out the full URL repeatedly, making tests cleaner and easier to maintain.
* **`defaultCommandTimeout: 8000`** : The default command timeout has been increased to 8000 milliseconds (8 seconds). This provides more time for Cypress commands to complete, which is beneficial when interacting with dynamic web elements or during slower network conditions, reducing flaky test failures.

---

## Test Files and Their Contents

Here's a list of the Cypress test files in the `cypress/e2e` directory and a brief description of what each one tests:

* **`sorting.cy.js`** : This file contains tests to verify that products within a specific category (e.g., Skin Care) are correctly sorted alphabetically (A-Z). It specifically checks the order of the first three products after sorting.
* **`cart.cy.js`** : This suite focuses on the shopping cart functionality. It adds two different products to the cart, verifies their names, prices, and quantities on the cart page, and then calculates and compares the expected sub-total with the one displayed on the page.
* **`categories.cy.js`** : This test verifies the total number of main product categories displayed on the website's homepage, ensuring there are exactly 7 categories present in the primary navigation menu.
* **`registration.cy.js`** : This file covers the error handling of the user registration form. It attempts to submit the form with various invalid inputs (e.g., empty required fields, invalid email format, mismatched passwords) and asserts that the appropriate error messages are displayed to the user.
* **`guestCheckoutFlow.cy.js`** : This is a comprehensive end-to-end test that simulates a full purchase journey as a guest user. It includes searching for a product, navigating to its detail page, verifying existing product reviews, adding the product to the cart, proceeding through the guest checkout process, providing necessary order details, and finally verifying the order confirmation/invoice page.
