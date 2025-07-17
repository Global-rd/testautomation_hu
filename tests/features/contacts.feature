@contacts
Feature: Contact management functionality

  Background:
    Given the user is logged in and on the Contact List page

@create @smoke
  Scenario: Create a new contact
    When the user creates a new contact with valid information
    Then the contact is successfully added to the contact list
    And the contact appears in the contact list

@edit
  Scenario: Edit an existing contact
    When the user edits the contact information
    Then the contact information is updated successfully
    And the updated information is displayed in the contact details

@delete
  Scenario: Delete a contact
    When the user deletes the contact
    Then the contact is removed from the contact list
    And the contact no longer appears in the list

@create
  Scenario Outline: Create multiple contacts with different data
    When the user creates a contact with "<firstName>", "<lastName>", "<email>", and "<phone>"
    Then the contact "<firstName> <lastName>" appears in the contact list
    And the contact email "<email>" is displayed correctly

    Examples:
      | firstName | lastName | email                | phone       |
      | Noah      | Doe      | noah.doe@test.com    | 1234567890  |
      | Chloé     | Smith    | chloe.smith@test.com | 1987654321  |
      | Bob       | Johnson  | bob.johnson@test.com | 1122334455  |

@create
  Scenario: Create contact with comprehensive data
    When the user creates a contact with the following information:
      | Field         | Value             |
      | firstName     | Alice             |
      | lastName      | Brown             |
      | birthdate     | 1987-08-17        |
      | email         | alice@test.com    |
      | phone         | 1555123456        |
      | street1       | 5678 7 Avenue SW  |
      | city          | Montréal          |
      | stateProvince | Quebec            |
      | postalCode    | H2X 3L5           |
      | country       | Canada            |
    Then the contact "Alice Brown" appears in the contact list
    And all contact details are saved correctly