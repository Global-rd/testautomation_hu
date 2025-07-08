Feature: Login functionality

    @login @success
    Scenario: Successful login
        Given The user navigate to the login page
        When The user is logging with valid credentials
        Then The user should see the contact list page

    @login @fail
    Scenario Outline: Login with invalid credentials
        Given The user navigate to the login page
        When The user is logging with username "<username>" and password "<password>"
        Then The user should see an error message

        Examples:
        | username         | password  |
        | test@itocska.com | wrongpass |
        | wrong@mail.com   | test123   |
