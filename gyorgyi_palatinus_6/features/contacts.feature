Feature: Contact management

Background:
Given the user is logged in

Scenario: Add a new contact
When the user fills out the contact form with valid data
Then the user should see the new contact in the contact list

Scenario: Edit an existing contact
Given the user is in the contact details from the contact "Jane" and "Smith"
When the user edits the email to "janesmith@example.com"
Then the user should see the updated contact in the contact list

Scenario: Delete an existing contact
Given the user is in the contact detail from "Jane" and "Smith"
When the user deletes one contact
Then the contact list has been updated