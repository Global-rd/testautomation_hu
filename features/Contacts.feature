# Feature: Contact Management
# This feature covers the creation, editing, and deletion of contacts
# once a user is logged into the application.
@login
Feature: Contact Management

  Background:
    Given User is logged in and on the contacts page

  Scenario Outline: Create a new contact
    When User clicks the Add New Contact button
    And User fills in the contact form with <firstName>, <lastName>, <email> and <phoneNumber>
    And User clicks the Save button
    Then the contact <email> should appear in the contact list
    Examples:
      | firstName | lastName | email | phoneNumber |
      | "John"      | "Doe"      | "johndoe@laba-test.hu"  | "987-654-3211" |
      | "Jane"      | "Doe"      | "janedoe@laba-test.hu"  | "987-654-3213" |
      | "Doe"       | "Doe"      | "doedoe@laba-test.hu" | "987-654-3217" |

  Scenario: Edit an existing contact
    Given a contact with the name "Jane Doe" exists
    When User finds the contact "Jane Doe" and clicks to edit
    And User updates the phone number to "987-654-3210" and saves
    Then the contact "Jane Doe" should have the phone number "987-654-3210"

  Scenario: Delete a contact
    Given a contact with the name "John Doe" exists
    When User finds the contact "Jane Doe" and clicks to edit
    And User clicks and confirms delete
    Then the contact "John Doe" should not appear in the contact list
