@login
Feature: Login functionality

  Background:
    Given the user is on the login page

@smoke
    Scenario: Successful login with valid user credentials
        When the user submits valid credentials for an existing account
        Then the user is redirected to the Contact List page

@negative
    Scenario Outline: Unsuccessful login with invalid password
        When the user submits a valid username and an incorrect password
        Then the user remains on the login page
        Then the error message "<message>" is displayed

    Examples:
        | message                                 |
        | Incorrect username or password          |