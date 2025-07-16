Feature: Register from JSON file

Scenario: Register attempts using JSON data
Given user credentials are loaded from a JSON file
When I attempt logins for each user in the JSON file
Then I should be redirected to the contact list page