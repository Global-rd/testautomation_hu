@contacts
Feature: Manage contacts
  As an authenticated user
  I want to create, edit and delete contacts

  Background:
    Given I am logged in

  @create
  Scenario Outline: Create a new contact using a Data Table
    When I create a new contact:
      | firstName | <firstName> |
      | lastName  | <lastName>  |
      | email     | <email>     |
      | phone     | <phone>     |
    Then I should see the contact "<firstName> <lastName>" in the list

    Examples:
      | firstName | lastName | email                  | phone       |
      | Anna      | Teszt    | anna.teszt@example.com | 36201234567 |

  @edit
  Scenario: Edit an existing contact generated dynamically
    Given I have a random contact created
    When I update the contact last name to "Updated"
    Then I should see the contact with last name "Updated" in the list

  @delete
  Scenario: Delete a contact
    Given I have a random contact created
    When I delete that contact
    Then I should not see that contact in the list
