# Parabank – Cypress UI + API Test Automation

This project is a functional test automation suite for the [Parabank](https://parabank.parasoft.com/) demo application using **Cypress**. It combines **UI and API layer testing** based on defined business requirements.

## Objective

The goal of these tests is to validate the following features:
- Opening a new account
- Creating a "SAVINGS" type account
- Transferring funds (overdraft behavior)
- Submitting loan requests with partial required input
- Updating the user profile via API only
- Validating error handling when transferring to the same account (negative test)

## Installing 

```bash
git clone git@github.com:Global-rd/testautomation_hu.git
cd testautomation_hu
npm install
```
## Run tests

```bash
npx cypress open
npx cypress run
```

