Feature: Login functionality

  Scenario: Successful login
    Given I navigate to the login page
    When I enter username "student" and password "Password123"
    And I click the login button
    Then I should be redirected to the secure area

  Scenario: Successful login
    Given I navigate to the login page
    When I enter username "admin" and password "Password123"
    And I click the login button
    Then I should be redirected to the secure area

    Scenario: Successful login
    Given I navigate to the login page
    When I enter username "student" and password "Password123"
    And I click the login button
    Then I should be redirected to the secure area    