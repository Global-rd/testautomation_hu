@contact
Feature: Contact management

  Background:
    Given I am logged in

  
  Scenario: Create a new contact
    When I create a new contact with the following data:
      | firstName | lastName | email           | phone      |
      | John      | Doe      | john@doe.com    | 1234567890 |
    Then I should see the new contact in the list

  Scenario Outline: Edit a contact
    Given a contact exists
    When I edit the contact with "<field>" to "<value>"
    Then the contact should be updated

    Examples:
      | field     | value       |
      | firstName | Jonathan    |
      | email     | jon@doe.com |

  Scenario: Delete a contact
    Given a contact exists
    When I delete the contact
    Then the contact should be removed from the list
