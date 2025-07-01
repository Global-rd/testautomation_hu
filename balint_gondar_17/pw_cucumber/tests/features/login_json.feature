Feature: Login from JSON file
@focus 
  Scenario: Login attempts using JSON data
    Given user credentials are loaded from a JSON file
    When I attempt logins for each user in the JSON file
