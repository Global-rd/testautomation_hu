Feature: Login functionality on https://thinking-tester-contact-list.herokuapp.com/

Background:
Given the user is on the login page
@focus
Scenario Outline: Successful login
When the user enters the email "<email>" and the password "<password>"
Then the user should see "<result>"

Examples:
| email               | password    | result |
| stevenf@example.com | Password123 | Contact List |
@focus
Scenario Outline: Unsuccessful login
When the user enters the email "<email>" and the password "<password>"
Then an error message "<result>" should be displayed


Examples:
| email              | password    | result |
| maxbig@example.com | wrongpass   | Invalid email or password |
| wronguser          | Password345 | Invalid email or password |