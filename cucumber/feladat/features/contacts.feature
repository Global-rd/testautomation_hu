Feature: Contact Management

  Scenario: Create a new contact
    Given the user logs in with the following credentials:
      | email | password       |
      | pollametta | password |
    When the user creates a new contact with the following data:
      | name      | email             |
      | John Doe  | john@example.com  |
    Then the new contact should appear in the list
      | name      | email             |
      | John Doe  | john@example.com  |

  Scenario: Edit an existing contact
    Given a contact named "John Doe" exists
    When the user edits the contact with the following new data:
      | name        | email              |
      | Doe John    | doe@example.com    |
    Then the updated contact should appear in the list
      | name        | email              |
      | Doe John    | doe@example.com    |

  Scenario: Delete a contact
    Given a contact named "Doe John" exists
    When the user deletes the contact
    Then the contact should no longer appear in the list
