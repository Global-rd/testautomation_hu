@login
Feature: Login functionality
  In order to use the Contact List app
  As a registered user
  I want to log in with valid credentials

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
    And the error message "<message>" is displayed

    Examples:
      | message                        |
      | Incorrect username or password |
