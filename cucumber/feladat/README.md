# README

This project contains system tests for a web application, implemented using Cucumber and Playwright.

## Dependencies

There should not be any dependency, the packages are installed into the repo.

## Running Tests

To run the tests, use the following command:
'''
npm test
'''

## System Tests

The following scenarios are covered by the tests:

1️⃣ Login Tests (Login.feature)

    ✅ Successful login: Tests login flow with valid user credentials.

    ❌ Failed login: Checks for correct error message when using an incorrect password.

2️⃣ Contacts Tests (Contacts.feature)

    ➕ Create new contact: Validates that a new contact can be successfully added.

    ✏️ Edit contact: Verifies updating and saving contact details.

    🗑️ Delete contact: Confirms contact can be deleted with proper confirmation handling.

### Login
- Successful login with valid credentials
- Unsuccessful login with an invalid password
- Unsuccessful login with an invalid email

### Contact Management
- Create a new contact
- Edit an existing contact
- Delete a contact
