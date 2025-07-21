# Feature: User Login
# This feature describes the login functionality of the application.
# It includes scenarios for both successful and unsuccessful login attempts.

Feature: User Login Functionality

  Scenario: Successful login with valid credentials
    Given User is on the login page
    When User enters valid username and valid password
    And User clicks the Login button
    Then User should be redirected to the contact list


  Scenario: Unsuccessful login with incorrect password
    Given User is on the login page
    When User enters valid username and invalid password
    And User clicks the Login button
    Then User should remain on the login page
    And User should see an Incorrect username or password error message