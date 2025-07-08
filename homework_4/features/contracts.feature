Feature: Contact management

  Background:
    Given The user is logged in

  Scenario: Create a new contact
    When The user add a new contact with the following data:
      | firstName | lastName | birthdate   | email            | phone     |
      | Test      | Elek     | 1990-01-01  | test@example.com | 123456789 |
    Then The user should see the new contact listed

  Scenario: Edit a contact
    When The user edit the contact with email "test@example.com" to have phone "987654321"
    Then The user should see the updated contact

  Scenario: Delete a contact
    When The user delete the contact with email "test@example.com"
    Then The user should not see that contact anymore
