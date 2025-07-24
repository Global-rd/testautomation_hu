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
    When the user creates a contact with "<firstName>", "<lastName>", "<birthdate>"
    Then the contact "<firstName> <lastName>" appears in the contact list
    And the contact birthdate "<birthdate>" is displayed correctly

    Examples:
      | firstName | lastName | birthdate            |
      | Jason     | Doe      | 2022-08-12           | 
      | Fester    | Hamilton | 1900-12-23           | 
      | Bobber    | Kurwa    | 1880-10-23           | 

@create
  Scenario: Create contact with comprehensive data
    When the user creates a contact with the following information:
      | Field         | Value             |
      | firstName     | Test              |
      | lastName      | Test2             |
      | birthdate     | 1991-08-17        |
      | email         | Test2@gmail.com   |
      | phone         | 123456            |
      | street1       | Questionedstreet 2|
      | city          |    Mexico         |
      | stateProvince |    Xgona          |
      | postalCode    |   1234QA          |
      | country       | Imagineland       |
    Then the contact "Test Test2" appears in the contact list
    And all contact details are saved correctly