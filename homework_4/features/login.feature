Feature: Login functionality

  Scenario: Successful login
    Given The user navigate to the login page
    When The user is logging with valid credentials
    Then The user should see the contact list page

  Scenario: Failed login with wrong password
    Given The user navigate to the login page
    When The user is logging with username "test@example.com" and password "wrongpass"
    Then The user should see an error message

  Scenario Outline: Login with invalid credentials
    Given The user navigate to the login page
    When The user is logging with username "<username>" and password "<password>"
    Then The user should see an error message

    Examples:
      | username         | password  |
      | test@example.com | badpass   |
      | inval@mail.com   | 123456    |
