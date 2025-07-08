Feature: Contact management

    Background:
        Given The user is logged in

    @contact @create
    Scenario: Create a new contact
        When The user add a new contact with the following data:
            | firstName | lastName | birthdate   | email            | phone     | address       | city      | state | postalCode    | country   |
            | Test      | Elek     | 1990-01-01  | test@example.com | 123456789 | test utca 15  | Budapest  | Pest  | 1138          | Hungary   |
        Then The user should see the new contact listed

    @contact @edit
    Scenario: Edit a contact
        When The user edit the phone in the contact
        Then The phone in contact should be changed

    @contact @delete
    Scenario: Delete a contact
        When The user delete the contact with email
        Then The user should not see that contact anymore
