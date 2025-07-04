@login
Feature: Login functionality

  Scenario: Successful login with valid credentials
    Given I navigate to the login page
    When I login with email "testGabor@exampleJuly3.com" and password "Test1234!"
    Then I should see the contact list page
    
@expect-failure
  Scenario: Failed login with incorrect password
    Given I navigate to the login page
    When I login with email "testGabor@exampleJuly3.com" and password "wrongpass"
    Then I should see an error message
