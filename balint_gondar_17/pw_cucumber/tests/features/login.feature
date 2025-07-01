Feature: Login functionality on practicetestautomation.com

  Scenario: Successful login
    Given the user is on the login page
    When the user is logged in as "admin"
    Then they should be redirected to the logged-in page

  Scenario: Failed login
    Given the user is on the login page
    When they enter username "wronguser" and password "wrongpass"
    Then an error message should be displayed

  Scenario Outline: Login with different user credentials
    Given the user is on the login page
    When they enter username "<username>" and password "<password>"
    Then <result>

    Examples:
      | username   | password     | result                                |
      | student    | Password123  | they should be redirected to the logged-in page |
      | invalid    | Password123  | an error message should be displayed  |
      | student    | wrongpass    | an error message should be displayed  |
