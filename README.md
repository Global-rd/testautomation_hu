# Contact List Test Automation Project

This project is for the automated testing of the "Thinking Tester Contact List" web application's features. The tests are written using the Cucumber framework with Gherkin syntax, and browser interactions are controlled by Playwright.

## What does the system test?

The framework covers the following main features:

* **Login:**
    * Successful login with a valid username and password.
    * Unsuccessful login with invalid credentials.
* **Contact Management:**
    * Creating a new contact.
    * Editing an existing contact's details (e.g., phone number).
    * Deleting a contact from the list.
    * Correctly displaying contact details in the table.

## Installation Steps

1.  **Download (Clone) the Project:**
    Download the project to your computer using Git.
    ```bash
    git clone <repository_url>
    cd <repository_folder>
    ```

2.  **Install Dependencies:**
    To install the necessary packages for running the project, execute the following command in the project's root directory:
    ```bash
    npm install
    ```
    This command downloads all the required modules (like Cucumber and Playwright) based on the `package.json` file.

## Run Commands

To run the tests, use the following command from the project's root directory:
```bash
npm test
```
This command starts the `cucumber-js` test runner with the settings specified in the `cucumber.js` configuration file. After the tests run, reports are generated in the `reports/` folder.
